<script setup lang="ts">
import { ref } from "vue";
import { jsonConfig } from "@/config";


const homeData = jsonConfig["home"];
const pageTitle = ref<string>(homeData["title"]);
const pageMessage = ref<string[]>(homeData["message"]);
const productLinkText = ref<string>(homeData["productLinkText"]);
const pageImage = ref<string>(homeData["imageUrl"]);

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
    opacity: 0.7;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    width: 100%;
    filter: brightness(0.7) contrast(1.2);
    transition: transform 0.3s ease, filter 0.3s ease;
    margin-top: 2%;
}
</style>