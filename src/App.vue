<script setup lang="ts">
import AppHeader from "./views/AppHeader.vue";
import AppFooter from "./views/AppFooter.vue";
import { useRouter } from 'vue-router';
import type { Headers, HeadChild } from "@/interface";
import { ref, onMounted } from 'vue';
import { jsonConfig } from "./config";


const appTitle = ref<string>(jsonConfig["appTitle"]);
const appLogo = ref<string>(jsonConfig["appLogo"]);

const redirectInit = ref<string>("/home");
const headersData = jsonConfig["headers"];
const headerToPath = {
  "head1": "/home",
  "head2": "/product",
  "head3": "/list",
  "head4": "/about",
  "head5": "/contact",
  "head6": "/blog",
  "head7": "/download",
};

const findHoisHomeKey = (headers: Headers): keyof Headers => {
    return (Object.entries(headers) as [keyof Headers, HeadChild][])
        .find(([_, value]) => value.isHome)?.[0] ?? "head1";
};
redirectInit.value = headerToPath[findHoisHomeKey(headersData)];

const appTheme = jsonConfig["theme"];

const isUserThemeChange = ref<boolean>(false);
if (appTheme === "user") {
  isUserThemeChange.value = true;
}

const router = useRouter();
const redirectPath = (): void => {
    router.push(redirectInit.value);
};

const showSplashScreen = ref(true);
onMounted(() => {
    setTimeout(() => {
        showSplashScreen.value = false;
        redirectPath();
    }, 1800);
});

const theme = ref(localStorage.getItem("theme") || "dark");

// テーマ切替
function setTheme(newTheme: string) {
  theme.value = newTheme;
  
  // 明示的なテーマの属性変更
  document.documentElement.setAttribute("data-theme", newTheme);

  // ローカルストレージに保存
  localStorage.setItem("theme", newTheme);
}

onMounted(() => {
  // 初期設定
  setTheme(theme.value);
});
</script>

<template>
  <div id="app-header">
    <AppHeader/>
  </div>

  <div v-if="showSplashScreen" id="splash-screen">
    <img :src="appLogo" alt="App Logo" class="logo-image">
    <h1 id="splash-title">{{ appTitle }}</h1>
  </div>

  <div id="theme-change-btn" v-show="isUserThemeChange">
    <img
        v-if="theme === 'dark'"
        src="/light.png"
        alt="ダークテーマ"
        class="change-thema-img btn-img"
        title="ライトテーマへ切り替え"
        v-on:click="setTheme('light')">
    <img
        v-else-if="theme === 'light'"
        src="/dark.png"
        alt="ライトテーマ"
        class="change-thema-img btn-img"
        title="ダークテーマへ切り替え"
        v-on:click="setTheme('dark')">
  </div>

  <div id="main-contents">
    <RouterView/>
  </div>
  <div id="app-footer">
    <AppFooter/>
  </div>
</template>

<style scoped>
#splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #727272, #ffffff);
  color: white;
  text-align: center;
  z-index: 1000;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#splash-title {
  color: #505050;
  font-size: 2.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  text-shadow: 2px 1px 2px rgb(165, 165, 165);
  letter-spacing: 1px;
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
  padding: 20px 10px;
  animation: fade-in 1.5s ease-in-out;
}

.logo-image {
  width: 100px;
  height: auto;
  animation: fade-in 1.5s ease-in-out;
  z-index: 1000;
  border: none;
  box-shadow: none;
}

#theme-change-btn {
  top: 1%;
  right: 1%;
}

.change-thema-img {
  width: 30px;
  position: fixed;
  top: 2%;
  right: 1%;
  padding: 10px 7px;
  text-decoration: none;
  border: 1px;
  border-radius: 20px;
  transition-property: opacity;
  -webkit-transition-property: opacity;
  transition-duration: .5s;
  -webkit-transition-duration: .5s;
  margin: 5px 5px 10px 5px;
}

.btn-img {
    border: none;
    box-shadow: none;
    max-width: 100%;
    background: transparent;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#app-footer {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

@media (max-width: 768px) {
  #app-footer {
    position: relative;
    bottom: 0;
    right: 0;
  }

  .logo-image {
    width: 80px;
  }
  
  #splash-title {
    font-size: 1.8rem;
  }
}
</style>
