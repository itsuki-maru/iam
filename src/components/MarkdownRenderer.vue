<script setup lang="ts">
import { ref, watchEffect } from "vue";
import MarkdownIt from "markdown-it";

const props = defineProps<{ url: string }>();
const md = new MarkdownIt();
const content = ref<string>("Loding...");

watchEffect(async () => {
    try {
        const response = await fetch(props.url);
        const text = await response.text();
        content.value = md.render(text);
    } catch (error) {
        console.error("Markdown load error.");
        content.value = "Failed to load Markdown.";
    }
});
</script>

<template>
    <div v-html="content"></div>
</template>

<style scoped>

</style>