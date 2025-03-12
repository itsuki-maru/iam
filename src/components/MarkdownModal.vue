<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import MarkdownRender from "@/components/MarkdownRenderer.vue";

const showModalContent = ref<boolean>(false);
const mdUrl = ref<string>("");
const handleOpenMarkdownModal = (url: string): void => {
    if (showModalContent.value) {
        showModalContent.value = false;
    } else {
        mdUrl.value = url;
        showModalContent.value = true;
    }
}

defineExpose({
    handleOpenMarkdownModal
});
</script>

<template>
    <transition>
        <div id="overlay-markdown" v-show="showModalContent">
            <div id="content-markdown">
                <MarkdownRender :url="mdUrl" class="content-markdown"/>
                <button class="fullscreen-close-btn" v-on:click="handleOpenMarkdownModal('')">閉じる</button>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

#overlay-markdown {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}


#content-markdown {
    z-index: 11;
    width: 100%;
    height: 95vh;
    padding: 35em;
    background: #f1f1f1;
    border-radius: 10px;
    overflow: scroll;
    text-align: left;
    color: #000000;
}

.content-markdown {
    width: 100%;
}

.fullscreen-close-btn {
    z-index: 12;
    position: fixed;
    bottom: 5%;
    right: 2%;
}

@media (max-width: 768px) {
    #content-markdown {
        z-index: 2;
        width: 90%;
        padding: 1em;
        background: whitesmoke;
        border-radius: 10px;
    }
}
</style>