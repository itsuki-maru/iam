<script setup lang="ts">
import { ref } from "vue";
import type { List } from "@/interface";
import { jsonConfig } from "@/config";


const listData = jsonConfig["list"];
const pageTitle = ref<string>(listData["title"]);

function createData(): Map<number, List> {
    const data = jsonConfig["list"];
    let newData = new Map<number, List>();

    let id = 1;

    for (let item of data["lists"]) {
        newData.set(id, {
            id: id,
            name: item.name,
            items: item.items,
        });
        id++;
    }
    return newData;
}

const listList = createData();

const listListRef = ref(listList);
const opendCategories = ref<string[]>([]);

const toggleList = (category: string) => {
    if (opendCategories.value.includes(category)) {
        opendCategories.value = opendCategories.value.filter((c) => c !== category);
    } else {
        opendCategories.value.push(category)
    }
}
</script>

<template>
    <!-- Lists Section -->
    <section id="lists" class="lists">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <div class="lists-container">
                <div class="list-category" v-for="[_, category] in listListRef" :key="category.name">
                    <button v-on:click="toggleList(category.name)" 
                        :class="{'open-category': opendCategories.includes(category.name) }">{{ category.name }}</button>
                    <transition name="fade">
                        <ul v-if="opendCategories.includes(category.name)" class="list-list">
                            <li v-for="list in category.items" :key="category.name" class="list-li">{{ list }}</li>
                        </ul>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@media (prefers-color-scheme: light) {
    .list-category button {
        background-color: #e3e3e3;
    }
    
    .list-category button:hover {
        background-color: #cdcdcd;
    }
    
    .list-category .list-list li {
        background-color: #efefef;
    }
}

@media (prefers-color-scheme: dark) {
    .list-category button {
        background-color: #313131;
    }
    
    .list-category button:hover {
        background-color: #1a1a1a;
    }
    
    .list-category .list-list li {
        background-color: #0e0e0e;
    }
}

[data-theme="light"] {
    .list-category button {
        color: #1a1a1a;
        background-color: #e3e3e3;
    }
    
    .list-category button:hover {
        background-color: #cdcdcd;
    }
    
    .list-category .list-list li {
        background-color: #efefef;
    }
}

[data-theme="dark"] {
    .list-category button {
        color: #f0f0f0;
        background-color: #313131;
    }
    
    .list-category button:hover {
        background-color: #1a1a1a;
    }
    
    .list-category .list-list li {
        background-color: #0e0e0e;
    }
}

.lists-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}

.list-category {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
}

.list-category button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: 0.5s;
}

.list-category button:hover {
    transition-duration: .5s;
    -webkit-transition-duration: .5s;
}

.list-category .list-list {
    margin-top: 10px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.list-category .list-list li {
    padding: 5px 10px;
    border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .lists-container {
        flex-direction: column;
        justify-content: center;
    }

    .list-category {
        margin: 0 20px;
    }
}
</style>