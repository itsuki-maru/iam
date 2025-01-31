<script setup lang="ts">
import { ref } from "vue";
import type { About } from "@/interface";
import { jsonConfig } from "@/config";


const titleData = jsonConfig["about"];
const pageTitle = ref<string>(titleData["title"]);

function createData(): Map<number, About> {
    const data = jsonConfig["about"];
    let newData = new Map<number, About>();

    let id = 1;

    for (let item of data["abouts"]) {
        newData.set(id, {
            id: id,
            key: item.key,
            value: item.value
        });
        id++;
    }
    return newData;
}

const aboutList = createData();

const aboutListRef = ref(aboutList);
</script>

<template>
    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <table>
                <thead>
                    <tr>
                        <th>項目</th>
                        <th>内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="[_, items] in aboutListRef">
                        <td>{{ items.key }}</td>
                        <td>{{ items.value }}</td>
                    </tr>
                </tbody>
            </table>
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
</style>