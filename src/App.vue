<script setup lang="ts">
import AppHeader from "./views/AppHeader.vue";
import AppFooter from "./views/AppFooter.vue";
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { setTitle, importJson } from "@/settings";


const appTitle = ref("");
const appLogo = ref("");
const getLogoTitle = async () => {
  appLogo.value = await importJson("appLogo");
  const title = await importJson("appTitle");
  appTitle.value = title;
  setTitle(title);
}
getLogoTitle();

const router = useRouter();
const homeRedirect = (): void => {
    router.push("/home");
};

const showSplashScreen = ref(true);
onMounted(() => {
    setTimeout(() => {
        showSplashScreen.value = false;
        homeRedirect();
    }, 1800);
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
