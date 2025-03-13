<script setup lang="ts">
import { ref, watchEffect } from "vue";
import MarkdownIt from "markdown-it";

const props = defineProps<{ url: string }>();
const md = new MarkdownIt();

// `link_open` ルールをカスタマイズしてリンクを別タブで開く
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    tokens[idx].attrPush(["target", "_blank"]);
    tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    return defaultRender(tokens, idx, options, env, self);
}

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