import {Configuration, OpenAIApi} from "openai";

export default defineEventHandler(async (event) => {
    const openaiConfiguration = new Configuration({
        organization: "org-BhT1D7t2vToLtJS9fUlNF4bb",
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(openaiConfiguration);
    try {
        const body = await readBody(event)

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: body.messages,
        });
        return response.data.choices[0].message
    } catch (err) {
        console.log('ERROR: '+ err)
        return null
    }

})