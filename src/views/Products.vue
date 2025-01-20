<script setup lang="ts">
import { ref, computed } from "vue";
import type { Product } from "@/interface";
import { useProductStore } from "@/stores/products";
import { importJson } from "@/settings";


const contactEmailAddress = ref("");
const pageTitle = ref("");
const pageMessage = ref([]);
const pageImage = ref("");
const mailHTMLText = ref("");
const getTitle = async () => {
    const titleData = await importJson("product");    
    pageTitle.value = titleData["title"];
    pageMessage.value = titleData["message"];
    pageImage.value = titleData["imageUrl"];

    contactEmailAddress.value = await importJson("contactEmailAddress");
    mailHTMLText.value = `mailto:${contactEmailAddress.value}?subject=問い合わせ&body=問い合わせ内容を記載してください。`;
}
getTitle();

const productDataStore = useProductStore();
productDataStore.initList();
const productList = computed(
  (): Map<number, Product> => {
    return productDataStore.productList;
  }
);

const productDataRef = ref(productList);
</script>

<template>
    <section id="products" class="products">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <div id="main-zone">
                <div class="message-zone" v-for="message in pageMessage">
                    <p >{{ message }}</p>
                </div>
                <div id="image-zone">
                    <img id="main-image" :src="pageImage" alt="">
                </div>
            </div>
            <div v-for="[index, card] in productDataRef"
                v-bind:key="index"
                :class="['card', { 'slide-right': index % 2 === 0, 'slide-left': index % 2 !== 0 }]"
                :id="`card-${index}`">
                <div class="card-title-image">
                    <h3 class="card-title">{{ card.productName}}</h3>
                    <img :src="card.imageUrl" :alt="card.productName">
                </div>
                <div class="card-body">
                    <p class="card-text">{{ card.productDetail }}</p>
                    <p v-for="row in card.productDetailMessage" class="card-li">{{ row }}</p>
                    <a v-if="card.productLink && card.productLinkIsBlank" :href="card.productLink" target="_blank">{{ card.productLinkText }}</a>
                    <a v-if="card.productLink && !card.productLinkIsBlank" :href="mailHTMLText">{{ card.productLinkText }}</a>
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
    opacity: 0.4;
    max-width: 1080px;
    height: auto;
    border-radius: 8px;
    width: 100%;
    filter: brightness(0.7) contrast(1.2);
    transition: transform 0.3s ease, filter 0.3s ease;
}

.card {
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #363636;
    border-radius: 8px;
    text-align: center;
    margin-top: 80px;
}

.card-title {
    margin: 10px 0;
    color: #fff;
}

.card:hover {
    box-shadow: 0 8px 30px 0 #494949;
    transition-duration: .5s;
    -webkit-transition-duration: .5s;
}

.card img {
    background-color: transparent;
    margin: 20px auto;
    border: 1px solid #353535;
    border-radius: 3px;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
    max-width: 100%;
}

.card-body {
    padding: 10px;
    color: #ccc;
}

@media (min-width: 768px) {
    #card-1 {
        margin-top: 200px;
    }

    .card.slide-left {
        display: flex;
        height: auto;
    }

    .card.slide-left .card-title-image {
        margin-left: 30px;
    }

    .card.slide-right {
        display: flex;
        flex-direction: row-reverse;
        height: auto;
    }

    .card.slide-right .card-title-image {
        margin-right: 30px;
    }
    
    .card-title {
        font-size: 2.2em;
    }
        
    .card img {
        max-width: 750px;
    }
    
    .card-body {
        font-size: 1.2em;
        width: 100%;
        margin-top: 50px;
    }

    .card-text {
        font-size: 1.4em;
        text-align: center;
    }
}

@media (max-width: 768px) {
    #card-1 {
        margin-top: 150px;
    }

    .card.slide-left {
        height: auto;
    }
    
    .card.slide-right {
        height: auto;
    }
    
    .card-title {
        font-size: 2.0em;
    }
        
    .card img {
        max-width: 95%;
    }
    
    .card-body {
        font-size: 1.0em;
    }

    .card-text {
        font-size: 1.2em;
        text-align: center;
    }

    .card-li {
        font-size: 0.9em;
        text-align: center;
    }
}

@media (prefers-color-scheme: light) {
    .card {
        box-shadow: 0 4px 8px #e7e7e7;
        background-color: #f3f3f3;
    }

    .card:hover {
        box-shadow: 0 8px 30px 0 #a3a3a3;
    }

    .card img {
        border: 1px solid #5f5f5f;
        box-shadow: 3px 3px 5px 0 rgba(197, 197, 197, 0.5);
    }

    .card-title {
        color: #213547;
    }

    .card-body {
        color: #213547;
    }
}
</style>