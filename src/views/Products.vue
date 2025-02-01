<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Product, ProductLists } from "@/interface";
import { jsonConfig } from "@/config";


const productData = jsonConfig["product"];
const pageTitle = ref<string>(productData["title"]);
const pageMessage = ref<string[]>(productData["message"]);
const pageImage = ref<string>(productData["imageUrl"]);
const contactEmailAddress = ref<string>(jsonConfig["contactEmailAddress"]);
const mailHTMLText = ref<string>(`mailto:${contactEmailAddress.value}?subject=問い合わせ&body=問い合わせ内容を記載してください。`);

function createData(): [Map<number, Product>, ProductLists[]] {
    const data = jsonConfig["product"];
    let newData = new Map<number, Product>();
    let newLinks: ProductLists[] = [];

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
        newLinks.push({id: id, name: item.productName});
        id++;
    }
    return [newData, newLinks];
}

const [productList, productLinks] = createData();
const productDataRef = ref(productList);

const smoothScroll = (elementId: string): void => {
    const element = document.getElementById(elementId) as HTMLElement;
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

const showScrollBtn = ref(false);
onMounted(() => {
    document.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY;
        let targetElement = document.getElementById("card-1");
        if (targetElement) {
            if (scrollPosition >= targetElement.offsetTop) {
                showScrollBtn.value = true;
            } else {
                showScrollBtn.value = false;
            }
        }
    });
});
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
            <div id="product-header-link">
                <ul v-for="link in productLinks">
                    <a :href="`#card-${link.id}`">{{ link.name }}</a>
                </ul>
            </div>
            <transition>
                <div id="util-btn" v-show="showScrollBtn">
                    <button
                        id="scroll-to-product-header-link-btn"
                        v-on:click="smoothScroll('product-header-link')">
                        ↑
                    </button>
                </div>
            </transition>
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

    #scroll-to-product-header-link-btn {
        color: #1a1a1a;
        background-color: #e3e3e3;
    }
    
    #scroll-to-product-header-link-btn:hover {
        background-color: #cdcdcd;
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

    #scroll-to-product-header-link-btn {
        color: #f0f0f0;
        background-color: #313131;
    }
    
    #scroll-to-product-header-link-btn:hover {
        background-color: #1a1a1a;
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

    #scroll-to-product-header-link-btn {
        color: #1a1a1a;
        background-color: #e3e3e3;
    }
    
    #scroll-to-product-header-link-btn:hover {
        background-color: #cdcdcd;
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

    #scroll-to-product-header-link-btn {
        color: #f0f0f0;
        background-color: #313131;
    }
    
    #scroll-to-product-header-link-btn:hover {
        background-color: #1a1a1a;
    }
}

.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
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

#product-header-link {
    max-width: 90%;
    display: flex; 
    margin: 30px auto;
    border-radius: 20px;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer / Edge */
    white-space: nowrap;
    scroll-margin-top: 450px;
}

#product-header-link::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

#product-header-link ul {
    align-items: center;
}

#product-header-link li {
    list-style: none;
}

#product-header-link a {
    text-decoration: none;
    color: #747474;
}

#product-header-link a:hover {
    color: #c0ab72;
    border-bottom: 2px solid #d4bc7a;
}

#util-btn {
    z-index: 1;
    position: fixed;
}

#scroll-to-product-header-link-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: ridge 0.5px #a9a9a9;
    font-size: 1.6em;
    font-weight: bold;
    text-decoration: none;
    padding: 0%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
}

.card {
    width: 100%;
    border-radius: 8px;
    text-align: center;
    margin-top: 60px;
    margin-bottom: 60px;
    scroll-margin-top: 100px;
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

    .product-header-link a {
        font-size: 1.2em;
    }

    #util-btn {
        top: 50%;
        right: 1%;
    }
}

@media (max-width: 768px) {
    .message-zone {
        font-size: 0.9em;
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

    .product-header-link a {
        font-size: 1.1em;
    }

    #util-btn {
        bottom: 30%;
        left: 10%;
    }
}
</style>
