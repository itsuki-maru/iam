<script setup lang="ts">
import { onMounted, ref, watch, defineExpose } from "vue";
import MarkdownRender from "@/components/MarkdownRenderer";

const showModalContent = ref<boolean>(false);
const handleOpenMarkdownModal = (): void => {
    if (showModalContent.value) {
        showModalContent.value = false;
    } else {
        showModalContent.value = true;
    }
}

defineExpose({
    handleOpenMarkdownModal
});
</script>

<template>
    <transition>
        <div id="overlay-markdown" v-show="showQRContent">
            <div id="content-markdown">
                <MarkdownRenderer url="/md/first.md"/>
                <button class="fullscreen-close-btn" v-on:click="handleOpenMarkdownModal()">閉じる</button>
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
    z-index:10;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display: flex;;
    align-items: center;
    justify-content: center;
}


#content-markdown {
    z-index: 11;
    width: 100%;
    height: 95vh;
    padding: 1em;
    background: #444444;
    border-radius: 10px;
}

.fullscreen-close-btn {
    z-index: 12;
    position: fixed;
    bottom: 5%;
    left: 2%;
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