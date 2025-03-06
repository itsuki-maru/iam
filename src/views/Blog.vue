<script setup lang="ts">
import { ref } from "vue";
import type { Blog } from "@/interface";
import { jsonConfig } from "@/config";
import MarkdownModal from "@/components/MarkdownModal.vue";


const titleData = jsonConfig["blog"];
const pageTitle = ref<string>(titleData["title"]);

function createData(): Map<number, Blog> {
    const data = jsonConfig["blog"];
    let newData = new Map<number, Blog>();
    let id = 1;

    for (let item of data["blogs"]) {
        newData.set(id, {
            id: id,
            title: item["title"],
            link: item["link"],
            thumbnailUrl: item["thumbnailUrl"],
            isExternal: item["isExternal"],
        });
        id++;
    }
    return newData;
}

const blogList = createData();

const blogListRef = ref(blogList);
</script>

<template>
    <!-- Blog Section -->
    <section id="blog" class="blog">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <div class="blog-cards">
                <div v-for="[number, items] in blogListRef" :key="items.id" class="card" :title="items.title">
                    <a v-if="items.isExternal" :href="items.link" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: black;">
                        <h3 class="card-title">{{ items.title }}</h3>
                        <img :src="`${items.thumbnailUrl}`" alt="サムネイル">
                    </a>
                    <a v-else :href="items.link">
                        <h3 class="card-title">{{ items.title }}</h3>
                        <img :src="`${items.thumbnailUrl}`" alt="サムネイル">
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@media (prefers-color-scheme: light) {
    th, td {
        border: 1px solid #213547;
    }

    th {
        background-color: #f0f0f0;
    }
    
    tr:nth-child(even) {
        background-color: #f3f3f3;
    }
}

@media (prefers-color-scheme: dark) {
    th, td {
        border: 1px solid #ddd;
    }

    th {
        background-color: #131313;
    }
    
    tr:nth-child(even) {
        background-color: #383838;
    }
}

[data-theme="light"] {
    th, td {
        border: 1px solid #213547;
    }

    th {
        background-color: #f0f0f0;
    }
    
    tr:nth-child(even) {
        background-color: #f3f3f3;
    }
}

[data-theme="dark"] {
    th, td {
        border: 1px solid #ddd;
    }

    th {
        background-color: #131313;
    }
    
    tr:nth-child(even) {
        background-color: #383838;
    }
}

table {
    width: 60%;
    margin: 0 auto;
    border-radius: collapse;
}

th, td {
    padding: 8px;
    text-align: center;
}

@media (max-width: 768px) {
    table {
        width: 100%;
        font-size: 0.8em;
    }
}

.container {
    align-items: center;
}

.blog-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    grid-gap: 10px;
    max-width: 80%;
    justify-content: center;
}

.card {
    margin: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: var(--card-background-color);
}

.card-title {
    white-space: nowrap;
    text-align: center;
    font-size: 0.9em;
    margin: 1;
    text-overflow: ellipsis;
    color: rgb(27, 27, 27);
}

.card:hover {
    box-shadow: var(--card-hover-box-shadow);
}

.card img {
    display: block;
    margin: 0 auto;
    max-width: 100px;
    max-height: 80px;
    height: auto;
}

.card p {
    color: rgb(27, 27, 27);
    font-size: 0.8em;
}

.card-body {
    padding: 2px 16px;
    font-size: 0.7em;
    color: rgb(27, 27, 27);
}
</style>