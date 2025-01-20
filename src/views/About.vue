<script setup lang="ts">
import { ref, computed } from "vue";
import type { About } from "@/interface";
import { useAboutStore } from "@/stores/abouts";
import { importJson } from "@/settings";


const pageTitle = ref("");
const getTitle = async () => {
    const titleData = await importJson("about");    
    pageTitle.value = titleData["title"];
}
getTitle();

const aboutDataStore = useAboutStore();
aboutDataStore.initList();
const aboutList = computed(
  (): Map<number, About> => {
    return aboutDataStore.aboutList;
  }
);

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
table {
    width: 60%;
    margin: 0 auto;
    border-radius: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #131313;
}

tr:nth-child(even) {
    background-color: #383838;
}

@media (max-width: 768px) {
    table {
        width: 100%;
        font-size: 0.9em;
    }
}

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
</style>