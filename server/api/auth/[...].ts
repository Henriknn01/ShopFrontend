import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from "#auth";

async function decodeToken(token) {
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
        return JSON.parse(decodedJson);
    } catch (error) {
        console.warn(error)
        return null
    }
}
async function refreshAccessToken(refreshToken: {
    accessToken: string;
    accessTokenExpires: string;
    refreshToken: string;
}) {
    try {
        console.warn("trying to post to refresh token");
        const refreshedTokensResponse = await fetch(
            process.env.BACKEND_API_URL + "/auth/jwt/refresh",
            {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh_token: refreshToken.refreshToken,
                        mode: "json",
                    }),
            }
        );
        const refreshedTokens = await refreshedTokensResponse.json()

        if (!refreshedTokens) {
            console.warn("No refreshed tokens");
            throw refreshedTokens;
        }
        console.warn("Refreshed tokens successfully");
        return {
            ...refreshToken,
            accessToken: refreshedTokens.access,
            accessTokenExpires: refreshedTokens.accessTokenExpires,
            refreshToken: refreshedTokens.refresh,
        };
    } catch (error) {
        console.warn("Error refreshing token", error);
        return {
            ...refreshToken,
            error: "RefreshAccessTokenError",
    };
    }
}

export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret:  process.env.NUXT_SECRET,
    pages: {
        // Change the default behavior to use `/login` as the path for the sign-in page
        signIn: '/login'
    },
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'username' },
                password: { label: 'Password', type: 'password', placeholder: 'password' }
            },
            async authorize (credentials: any) {
                try {
                    const tokenResponse= await fetch(
                        process.env.BACKEND_API_URL + `/auth/jwt/create/`,
                        {
                                method: "POST",
                                body: JSON.stringify({
                                    email: credentials.username,
                                    password: credentials.password,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                        });
                    const userTokens = await tokenResponse.json()

                    const userDetailsResponse = await fetch(
                        process.env.BACKEND_API_URL + "/auth/users/me/", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept-Language": "en-US",
                            Authorization: `Bearer ${userTokens.access}`,
                        },
                    });
                    const userDetails = await userDetailsResponse.json();

                    if (!userTokens || !userDetails ) {
                        throw createError({
                            statusCode: 500,
                            statusMessage: "Next auth failed",
                        });
                    };
                    const decodedAccessJWT = await decodeToken(userTokens.access);
                    const decodedRefreshJWT = await decodeToken(userTokens.access);

                    const user = {
                        id: userDetails.id,
                        email: userDetails.email,
                        firstName: userDetails.first_name,
                        lastName: userDetails.last_name,
                        role: userDetails.role,
                        accessToken: userTokens.access,
                        accessTokenExpires: decodedAccessJWT.exp,
                        refreshToken: userTokens.refresh,
                        refreshTokenExpires: decodedRefreshJWT.exp,
                    };
                    return user;
                } catch (error) {
                    console.warn("Error logging in", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, account, session }) {
            if (account && user) {
                console.warn("JWT callback", { token, user, account });
                return {
                    ...token,
                    ...user,
                };
            }
            // Handle token refresh before it expires of 15 minutes
            if (token.accessTokenExpires && Date.now() > token.accessTokenExpires*1000) {
                console.warn("Token is expired. Getting a new");
                if (token.refreshTokenExpires && Date.now() > token.refreshTokenExpires*1000) {
                    console.warn("Refresh token expired")
                    // TODO: sign out when token expires.
                }
                return refreshAccessToken(token);
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                ...token,
            };
            return session;
        },
    },
})
