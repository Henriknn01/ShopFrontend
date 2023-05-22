import {Configuration, OpenAIApi} from "openai";

export default defineEventHandler(async (event) => {
    const openaiConfiguration = new Configuration({
        organization: process.env.OPENAI_ORGANIZATION,
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(openaiConfiguration);
    try {
        const body = await readBody(event)

        const response = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL,
            messages: body.messages,
        });
        return response.data.choices[0].message
    } catch (err) {
        console.log('ERROR: '+ err)
        return null
    }

})