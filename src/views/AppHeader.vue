<script setup lang="ts">
import { ref } from "vue";
import type { Headers } from "@/interface";
import { jsonConfig } from "@/config";


const appTitle = ref<string>(jsonConfig["appTitle"]);
const headersData = ref<Headers>(jsonConfig["headers"]);

const head1Title = ref<string>(headersData.value["head1"]["title"]);
const head1IsShow = ref<boolean>(headersData.value["head1"]["isShow"]);

const head2Title = ref<string>(headersData.value["head2"]["title"]);
const head2IsShow = ref<boolean>(headersData.value["head2"]["isShow"]);

const head3Title = ref<string>(headersData.value["head3"]["title"]);
const head3IsShow = ref<boolean>(headersData.value["head3"]["isShow"]);

const head4Title = ref<string>(headersData.value["head4"]["title"]);
const head4IsShow = ref<boolean>(headersData.value["head4"]["isShow"]);

const head5Title = ref<string>(headersData.value["head5"]["title"]);
const head5IsShow = ref<boolean>(headersData.value["head5"]["isShow"]);

const head6Title = ref<string>(headersData.value["head6"]["title"]);
const head6IsShow = ref<boolean>(headersData.value["head6"]["isShow"]);

const boolList: boolean[] = [
  head1IsShow.value,
  head2IsShow.value,
  head3IsShow.value,
  head4IsShow.value,
  head5IsShow.value,
  head6IsShow.value,
]

const countTrue = boolList.filter(value => value).length;
</script>

<template>
    <!-- Header -->
    <header>
        <div class="nav-menu">
            <h1 class="logo">{{ appTitle }}</h1>
            <nav v-if="countTrue >= 2">
                <ul>
                    <li v-if="head1IsShow"><RouterLink active-class="active-tab" to="/home">{{ head1Title }}</RouterLink></li>
                    <li v-if="head2IsShow"><RouterLink active-class="active-tab" to="/product">{{ head2Title }}</RouterLink></li>
                    <li v-if="head3IsShow"><RouterLink active-class="active-tab" to="/list">{{ head3Title }}</RouterLink></li>
                    <li v-if="head4IsShow"><RouterLink active-class="active-tab" to="/about">{{ head4Title }}</RouterLink></li>
                    <li v-if="head5IsShow"><RouterLink active-class="active-tab" to="/contact">{{ head5Title }}</RouterLink></li>
                    <li v-if="head6IsShow"><RouterLink active-class="active-tab" to="/blog">{{ head6Title }}</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
@media (prefers-color-scheme: light) {
  .nav-menu a {
    color: #333333;
  }
}

@media (prefers-color-scheme: dark) {
  .nav-menu a {
    color: #747474;
  }
}

[data-theme="light"] {
  .nav-menu a {
    color: #333333;
  }
}

[data-theme="dark"] {
  .nav-menu a {
    color: #747474;
  }
}

.nav-menu {
  text-align: center;
}

.nav-menu ul {
    margin: 0;
    padding: 0;
}

.nav-menu li {
    list-style: none;
    display: inline-block;
    width: 10%;
    min-width: 90px;
}

.nav-menu li:not(:last-child) {
  border-right: 2px solid #ddd;
}

.nav-menu a {
  text-decoration: none;
}

.nav-menu a:hover {
  color: #c0ab72;
  border-bottom: 2px solid #d4bc7a;
}

.active-tab {
  color: #c0ab72;
  border-bottom: 2px solid #d4bc7a;
}

@media (max-width: 768px) {
  .nav-menu li {
    font-size: 0.8em;
    min-width: 80px;
  }
}
</style>