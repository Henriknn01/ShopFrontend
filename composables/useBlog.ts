interface BlogPost {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    date: string;
    href: string;
}

export default async function useBlog(): Promise<BlogPost[]> {
    let pageIndex = 0;
    const pageSize = 5; // Number of blog posts per page

    async function getProductListPicture(imageID: number) {
        try {
            const response = await $fetch(
                `http://127.0.0.1:8000/Image/?format=json&id=` + imageID
            );
            return response[0].src;
        } catch (e) {
            console.warn(e);
        }
    }

    async function getAuthorName(imageID: number) {
        try {
            const response = await $fetch(
                `http://127.0.0.1:8000/Image/?format=json&id=` + imageID
            );
            return response[0].src;
        } catch (e) {
            console.warn(e);
        }
    }

    async function getBlogPosts(): Promise<BlogPost[]> {
        try {
            const response = await $fetch(
                'http://127.0.0.1:8000/blogpost/?ordering=-created_at'
            );
            const data = await response;
            const blogPosts = await Promise.all(
                data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map(
                    async (post: any) => ({
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        imageUrl: await getProductListPicture(post.banner_image),
                        author: post.author,
                        date: post.created_at,
                        href: "",
                    })
                )
            );
            return blogPosts;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    }

    const blogPosts = await getBlogPosts();

    function nextPage() {
        pageIndex = Math.min(pageIndex + 1, Math.ceil(blogPosts.length / pageSize) - 1);
    }

    function prevPage() {
        pageIndex = Math.max(pageIndex - 1, 0);
    }

    return blogPosts;
}