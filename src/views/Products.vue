<script setup lang="ts">
import { ref } from "vue";
import type { Product } from "@/interface";
import { jsonConfig } from "@/config";


const productData = jsonConfig["product"];
const pageTitle = ref<string>(productData["title"]);
const pageMessage = ref<string[]>(productData["message"]);
const pageImage = ref<string>(productData["imageUrl"]);
const contactEmailAddress = ref<string>(jsonConfig["contactEmailAddress"]);
const mailHTMLText = ref<string>(`mailto:${contactEmailAddress.value}?subject=問い合わせ&body=問い合わせ内容を記載してください。`);

function createData(): Map<number, Product> {
    const data = jsonConfig["product"];
    let newData = new Map<number, Product>();

    let id = 1;

    for (let item of data["products"]) {
        newData.set(id, {
            id: id,
            productName: item.productName,
            imageUrl: item.imageUrl,
            productDetail: item.productDetail,
            productDetailMessage: item.productDetailMessage,
            productLink: item.productLink,
            productLinkText: item.productLinkText,
            productLinkIsBlank: item.productLinkIsBlank,
        });
        id++;
    }
    return newData;
}

const productList = createData();
const productDataRef = ref(productList);
</script>

<template>
    <section id="products" class="products">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <div id="main-zone">
                <div class="message-zone" v-for="message in pageMessage">
                    <p>{{ message }}</p>
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

@media (prefers-color-scheme: dark) {
    .card {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-color: #363636;
    }

    .card:hover {
        box-shadow: 0 8px 30px 0 #494949;
    }

    .card img {
        border: 1px solid #353535;
        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
    }

    .card-title {
        color: #fff;
    }

    .card-body {
        color: #ccc;
    }
}

[data-theme="light"] {
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

[data-theme="dark"] {
    .card {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-color: #363636;
    }

    .card:hover {
        box-shadow: 0 8px 30px 0 #494949;
    }

    .card img {
        border: 1px solid #353535;
        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.5);
    }

    .card-title {
        color: #fff;
    }

    .card-body {
        color: #ccc;
    }
}


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
    border-radius: 8px;
    text-align: center;
    margin-top: 80px;
}

.card-title {
    margin: 10px 0;
}

.card:hover {
    transition-duration: .5s;
    -webkit-transition-duration: .5s;
}

.card img {
    background-color: transparent;
    margin: 20px auto;
    border-radius: 3px;
    max-width: 100%;
}

.card-body {
    padding: 10px;
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
    .message-zone {
        font-size: 0.9em;
    }

    #card-1 {
        margin-top: 150px;
    }

    .card {
        margin-top: 20px;
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
</style>