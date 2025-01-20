import { defineStore } from "pinia";
import type { Product } from "@/interface";
import { importJson } from "@/settings";

interface State {
    productList: Map<number, Product>;
};

export const useProductStore = defineStore({
    id: "prejects",
    state: (): State => {
        return {
            productList: new Map<number, Product>()
        };
    },
    getters: {
        getById: (state) => {
            return (id: number): Product => {
                const product = state.productList.get(id) as Product;
                return product;
            }
        }
    },
    actions: {
        async initList(): Promise<void> {
            this.productList = await createData();
        }
    }
});

async function createData(): Promise<Map<number, Product>> {
    const data = await importJson("product");
    let newData = new Map<number, Product>();

    let id = 1;

    for (let item of data["products"]) {
        newData.set(id, {
            id: id,
            productName: item.productName,
            imageUrl: item.imageUrl,
            productDetail: item.productDetail,
            productDetailMessage: item.productDetailMessage,
            productLink: item.productLink,
            productLinkText: item.productLinkText,
            productLinkIsBlank: item.productLinkIsBlank,
        });
        id++;
    }
    return newData;
}