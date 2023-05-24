<script setup>
const emit = defineEmits(['created'])
const props = defineProps({
    productId: String,
});
const { signOut, status, data } = useAuth();
</script>

<template>
    <div class="w-full">
        <h5 class="text-2xl font-bold">Write a review</h5>
        <div class="gap-4">
            <form @submit.prevent="sendForm(props.productId, data.user)">
                <div>
                    <label>Content</label>
                    <textarea v-model="content" class="w-full h-20 shadow-inner rounded-md text-md p-2 bg-gray-50"></textarea>
                </div>
                <div>
                    <label>Stars</label>
                    <div class="flex text-xl">
                        <input v-model="rating" type="number" class="p-2 shadow-inner rounded-md bg-gray-50" max="5" min="0"/><span class="m-2">/ 5</span>
                    </div>
                </div>
                <div class="my-4">
                    <button class="bg-indigo-700 p-2 text-white rounded-md" type="submit">Submit review</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewForm",
    data() {
        return {
            content: "",
            rating: 0,
        }
    },
    methods: {
        clearInput() {
            this.content = "";
            this.rating = 0;
        },
        async sendForm(productId, user) {
            let tmpContent = this.content;
            let tmpRating = this.rating;
            this.clearInput();
            try {
                const response = await $fetch('/api/review', {
                    method: 'POST',
                    body: {
                        msg: tmpContent,
                        rating: tmpRating,
                        product: productId,
                        author: user.id,
                        token: user.accessToken
                    }
                });
                if (response === 201) {
                    this.$emit('created');
                }
            } catch (err) {
                console.log('ERROR: '+ err)
            }
        }
    }
}
</script>

<style scoped>

</style>