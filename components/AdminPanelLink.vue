
<script setup>
const props = defineProps({
    active: String,
    name: String,
    text: String,
    link: String
});
</script>

<template>
    <a :href="props.link">
        <div class="rounded p-2.5 mb-2 hover:bg-gray-100 cursor-pointer" v-if="props.active!==props.name">
            <h3 class="text-md inline-flex gap-2"><slot/>
                {{ props.text }}
            </h3>
        </div>
        <div class="bg-gray-200 font-semibold rounded p-2.5 mb-2 hover:bg-gray-100 cursor-pointer" v-else>
            <h3 class="text-md inline-flex gap-2"><slot/>{{ props.text }}</h3>
        </div>
    </a>
</template>

<script>
export default {
    name: "PanelLink"
}
</script>

<style scoped>

</style>