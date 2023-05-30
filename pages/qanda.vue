<template>
  <section class="bg-white">
    <div class="container max-w-4xl px-6 py-10 mx-auto">
      <h1 class="text-4xl font-semibold text-center text-black">Frequently asked questions</h1>

      <div class="mt-12 space-y-8">
        <div v-for="question in questions" :key="question.id" class="border-2 border-gray-100 rounded-lg">
          <button @click="toggleQuestion(question.id)" class="flex items-center justify-between w-full p-8">
            <h1 class="font-semibold text-black">{{ question.title }}</h1>

            <span :class="{'rotate-45': showQuestion === question.id, '-rotate-45': showQuestion !== question.id}" class="text-gray-400 bg-white rounded-full transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path v-if="showQuestion === question.id" d="M12 12L12 12"></path>
                <path v-else d="M12 6v12"></path>
              </svg>
            </span>
          </button>

          <hr class="border-gray-200">

          <p v-show="showQuestion === question.id" class="p-8 text-sm text-gray-500">
            {{ question.answer }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ auth: false });
</script>

<script>
export default {
  data() {
    return {
      showQuestion: null,

      questions: [
        {
          "id": 1,
          "title": "What is Wave Pet Plus?",
          "answer": "Wave Pet Plus is an online store that specializes in pet fashion and accessories. We offer a wide range of high-quality pet clothing and accessories to help your furry friend look and feel their best."
        },
        {
          "id": 2,
          "title": "What products does Wave Pet Plus offer?",
          "answer": "We offer a variety of pet clothing and accessories, including coats, sweaters, bandanas, and more. Our selection is designed to provide both style and comfort for your pets."
        },
        {
          "id": 3,
          "title": "What sets Wave Pet Plus apart from other pet stores?",
          "answer": "At Wave Pet Plus, we prioritize three core values: style, comfort, and affordability. We believe that pets should not only look good but also feel comfortable in their clothing. Additionally, we strive to keep our prices affordable so that pet owners can shop for their furry friends without breaking the bank."
        },
        {
          "id": 4,
          "title": "Is the quality of Wave Pet Plus products good?",
          "answer": "Yes, we are committed to providing our customers with the highest quality pet fashion and accessories. We carefully select our products to ensure they meet our standards for durability, comfort, and style."
        },
        {
          "id": 5,
          "title": "How can I place an order with Wave Pet Plus?",
          "answer": "Placing an order with Wave Pet Plus is easy. Simply visit our website and browse through our selection of pet clothing and accessories. Once you have found the items you want, add them to your cart and proceed to the checkout process. Follow the prompts to enter your shipping and payment information, and then confirm your order."
        },
        {
          "id": 6,
          "title": "Does Wave Pet Plus offer free shipping?",
          "answer": "Yes, we offer free shipping on orders over 100 NOK. This allows you to enjoy the convenience of shopping online without any additional shipping costs."
        }
      ]
    }
  },
  methods: {
    toggleQuestion(questionId) {
      if (this.showQuestion === questionId) {
        this.showQuestion = null;
      } else {
        this.showQuestion = questionId;
      }
    }
  }
}
</script>

<style scoped>
.rotate-45 {
  transform: rotate(45deg);
}
.-rotate-45 {
  transform: rotate(-45deg);
}
</style>