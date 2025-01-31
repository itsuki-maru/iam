import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routeSettings: RouteRecordRaw[] = [
    {
        path: "/",
        name: "top",
        component: () => {
            return import("@/views/AppTop.vue");
        }
    },
    {
        path: "/home",
        name: "home",
        component: () => {
            return import("@/views/Home.vue");
        }
    },
    {
        path: "/product",
        name: "product",
        component: () => {
            return import("@/views/Products.vue");
        }
    },
    {
        path: "/list",
        name: "list",
        component: () => {
            return import("@/views/Lists.vue");
        }
    },
    {
        path: "/about",
        name: "about",
        component: () => {
            return import("@/views/About.vue");
        }
    },
    {
        path: "/contact",
        name: "contact",
        component: () => {
            return import("@/views/Contact.vue");
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routeSettings,
});

export default router;