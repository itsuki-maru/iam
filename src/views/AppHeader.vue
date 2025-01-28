<script setup lang="ts">
import { ref } from "vue";
import { importJson } from "@/settings";


const appTitle = ref("");
const headersData = ref(null);
const head1Title = ref("");
const head1IsShow = ref(false);
const head2Title = ref("");
const head2IsShow = ref(false);
const head3Title = ref("");
const head3IsShow = ref(false);
const head4Title = ref("");
const head4IsShow = ref(false);

const getTitleHeader = async () => {
  headersData.value = await importJson("headers");
  appTitle.value = await importJson("appTitle");

  if (headersData.value === null) {
    return;
  }

  head1Title.value = headersData.value["head1"]["title"];
  head1IsShow.value = headersData.value["head1"]["isShow"];

  head2Title.value = headersData.value["head2"]["title"];
  head2IsShow.value = headersData.value["head2"]["isShow"];

  head3Title.value = headersData.value["head3"]["title"];
  head3IsShow.value = headersData.value["head3"]["isShow"];

  head4Title.value = headersData.value["head4"]["title"];
  head4IsShow.value = headersData.value["head4"]["isShow"];
}
getTitleHeader();


</script>

<template>
    <!-- Header -->
     <header>
        <div class="nav-menu">
            <h1 class="logo">{{ appTitle }}</h1>
            <nav>
                <ul>
                    <li v-if="head1IsShow"><RouterLink active-class="active-tab" to="/home">{{ head1Title }}</RouterLink></li>
                    <li v-if="head2IsShow"><RouterLink active-class="active-tab" to="/product">{{ head2Title }}</RouterLink></li>
                    <li v-if="head3IsShow"><RouterLink active-class="active-tab" to="/list">{{ head3Title }}</RouterLink></li>
                    <li v-if="head4IsShow"><RouterLink active-class="active-tab" to="/about">{{ head4Title }}</RouterLink></li>
                </ul>
            </nav>
        </div>
     </header>
</template>

<style scoped>
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
  color: #747474;
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