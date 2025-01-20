<script setup lang="ts">
import { ref } from "vue";
import { importJson } from "@/settings";

const pageTitle = ref("");
const pageMessage = ref([]);
const productLinkText = ref("");
const pageImage = ref("");
const getTitle = async () => {
    const titleData = await importJson("home");    
    pageTitle.value = titleData["title"];
    pageMessage.value = titleData["message"];
    productLinkText.value = titleData["productLinkText"]
    pageImage.value = titleData["imageUrl"];
}
getTitle();
</script>

<template>
    <!-- Home Section -->
     <section id="home" class="home">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <div id="main-zone">
                <div id="message-zone" v-for="message in pageMessage">
                    <p >{{ message }}</p>
                </div>
                <RouterLink to="/product">{{ productLinkText }}</RouterLink>
                <div id="image-zone">
                    <img id="main-image" :src="pageImage" alt="">
                </div>
            </div>
        </div>
     </section>
</template>

<style scoped>
#image-zone {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
}

#main-image {
    opacity: 0.5;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    width: 100%;
    filter: brightness(0.7) contrast(1.2);
    transition: transform 0.3s ease, filter 0.3s ease;
    margin-top: 2%;
}
</style>