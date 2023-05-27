<script setup lang="ts">
import { ChatBubbleOvalLeftIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div class="fixed bottom-0 right-0 z-50 m-8">
        <div class="grid grid-cols-12 auto-rows-auto bg-white w-80 md:w-96 border border-1 rounded-xl" v-if="isOpen">
            <div class="grid grid-cols-12 col-span-12">
                <div class="col-span-10 p-4">
                    <div class="relative flex items-center space-x-4">
                        <div class="relative">
                                <span class="absolute text-green-500 right-0 bottom-0">
                                   <svg width="15" height="15">
                                      <circle cx="8" cy="8" r="6" fill="currentColor"></circle>
                                   </svg>
                                </span>
                            <img src="https://api.dicebear.com/6.x/fun-emoji/svg?scale=80&seed=adalce" alt="customer support avatar" class="w-10 sm:w-10 h-10 sm:h-10 rounded-full">
                        </div>
                        <div class="flex flex-col leading-tight">
                            <div class="text-md mt-1 flex items-center">
                                <span class="text-gray-700 mr-3">Ada</span>
                            </div>
                            <span class="text-sm text-blue-600">AI Customer Support</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 m-auto">
                    <button class="p-4 text-gray-800 hover:text-gray-400" @click="toggleMinimized" aria-label="close chat window">X</button>
                </div>
            </div>
            <div class="col-span-12 h-64 space-y-3 p-4 overflow-y-auto justify-end scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                <div class="chat-message" v-for="msg in messages">
                    <div class="flex items-end justify-end" v-if="msg.role=='user'">
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                            <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{{ msg.content }}</span></div>
                        </div>
                        <img src="https://api.dicebear.com/6.x/fun-emoji/svg?scale=80&seed=user" alt="My profile" class="w-6 h-6 rounded-full order-2">
                    </div>
                    <div class="flex items-end" v-else-if="msg.role=='system'">
                        <div class="hidden">
                        </div>
                    </div>
                    <div class="flex items-end" v-else>
                        <div class="flex flex-col grow space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div><span class="px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-600">{{ msg.content }}</span></div>
                        </div>
                        <img src="https://api.dicebear.com/6.x/fun-emoji/svg?scale=80&seed=adalce" alt="My profile" class="w-6 h-6 rounded-full order-1">
                    </div>
                </div>
            </div>
            <div class="col-span-12 px-2 pt-2 mb-2 sm:mb-0">
                <div class="relative flex p-4">
                    <input type="text" v-on:keyup.enter="sendMsg" v-model="msg" placeholder="Write your message!" class="w-full pr-12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-2">
                    <div class="absolute right-4 items-center inset-y-0 flex">
                        <button type="button" @click="sendMsg" class="inline-flex items-center justify-center rounded-lg px-2 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none" aria-label="Send message to Ada">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <button class="w-12 h-12 p-2 text-lg font-bold rounded-full bg-blue-500 text-white hover:bg-blue-400" @click="toggleMinimized" aria-label="Open Ada Ai support chat window">
                <ChatBubbleOvalLeftIcon class="p-1 text-white" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
const { messages, sendMessage } = useChat();

export default {
    name: "ChatBox",
    data() {
        return {
            isOpen: false,
            messages: messages,
            msg: "",
        }
    },
    methods: {
        toggleMinimized() {
            this.isOpen = !this.isOpen
        },
        clearInput() {
            this.msg = "";
        },
        async sendMsg() {
            let tmpMsg = this.msg;
            this.clearInput();
            await sendMessage(tmpMsg);
        }
    }
}
</script>

<style scoped>

.scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
}
</style>