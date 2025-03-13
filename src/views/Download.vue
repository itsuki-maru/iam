<script setup lang="ts">
import { ref } from "vue";
import type { DownloadItems } from "@/interface";
import { jsonConfig } from "@/config";


const titleData = jsonConfig["download"];
const pageTitle = ref<string>(titleData["title"]);

function createData(): Map<number, DownloadItems> {
    const data = jsonConfig["download"];
    let newData = new Map<number, DownloadItems>();

    let id = 1;

    for (let item of data["items"]) {
        newData.set(id, {
            title: item.title,
            link: item.link
        });
        id++;
    }
    return newData;
}

const downloadList = createData();

const downloadListRef = ref(downloadList);
</script>

<template>
    <!-- DownloadItem Section -->
    <section id="download" class="download">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <li v-for="[_, items] in downloadListRef">
                <a :href="items.link">{{ items.title }}</a>
            </li>
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

li {
    list-style: none;
}

@media (max-width: 768px) {
    table {
        width: 100%;
        font-size: 0.8em;
    }
}
</style>