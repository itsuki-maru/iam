import type { Headers } from "@/interface";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { jsonConfig } from "@/config";

const headersData: Headers = jsonConfig["headers"];
const appTitle: string = jsonConfig["appTitle"];

const routeSettings: RouteRecordRaw[] = [
    {
        path: "/",
        name: "top",
        component: () => {
            return import("@/views/AppTop.vue");
        },
        beforeEnter: () => {
            document.title = appTitle;
        }
    },
    {
        path: "/home",
        name: "home",
        component: () => {
            return import("@/views/Home.vue");
        },
        beforeEnter: () => {
            document.title = headersData["head1"]["title"];
        }
    },
    {
        path: "/product",
        name: "product",
        component: () => {
            return import("@/views/Products.vue");
        },
        beforeEnter: () => {
            document.title = headersData["head2"]["title"];
        }
    },
    {
        path: "/list",
        name: "list",
        component: () => {
            return import("@/views/Lists.vue");
        },
        beforeEnter: () => {
            document.title = headersData["head3"]["title"];
        }
    },
    {
        path: "/about",
        name: "about",
        component: () => {
            return import("@/views/About.vue");
        },
        beforeEnter: () => {
            document.title = headersData["head4"]["title"];
        }
    },
    {
        path: "/contact",
        name: "contact",
        component: () => {
            return import("@/views/Contact.vue");
        },
        beforeEnter: () => {
            document.title = headersData["head5"]["title"];
        }
    },
    {
        path: "/blog",
        name: "blog",
        component: () => {
            return import("@/views/Blog.vue");
        },
        beforeEnter: () => {
            document.title = headersData["head6"]["title"];
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routeSettings,
});

export default router;