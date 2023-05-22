import { ref } from 'vue'

async function getInitialMsg() {
    const productsResponse = await fetch(
        process.env.BACKEND_API_URL + "/product/?format=json",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "en-US",
            },
        }
    );
    const productsList = productsResponse.json

    const initialMsg = [
        {
            role: "system",
            content: "You are a customer support agent for the online store named Wave. " +
                "Wave is a pet accessories store, selling pet clothes and accessories." +
                "Your job will be to answer any questions related to Wave's products and/or pet related questions." +
                "You will also have to answer any question related to the customers previous purchases and/or account related questions." +
                "Products in json format: " + JSON.stringify(productsList)
        },
        {
            role: "assistant",
            content: "Hello, how may i assist you?"
        }
    ];

    return initialMsg;
}

export default function useChat() {
    const messages = ref([]);

    const initialMessages = [
        {
            role: "system",
            content: "You are a customer support agent for the online store named Wave. " +
                "Wave is a pet accessories store, selling pet clothes and accessories." +
                "Your job will be to answer any questions related to Wave's products and/or pet related questions." +
                "You will also have to answer any question related to the customers previous purchases and/or account related questions." +
                "Products in json format: "
        },
        {
            role: "assistant",
            content: "Hello, how may i assist you?"
        }
    ];
    messages.value.push(...initialMessages);

    const sendMessage = async (msg) => {
        try {
            messages.value = [...messages.value, {role: "user", content: msg}]
            const response = await $fetch('/api/chat', {
                method: 'POST',
                body: { messages: messages.value}
            })
            messages.value.push(response);
        } catch (err) {
            console.log('ERROR: '+ err)
        }
    }

    return {
        messages,
        sendMessage
    }
}