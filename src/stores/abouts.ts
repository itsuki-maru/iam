import { defineStore } from "pinia";
import type { About } from "@/interface";
import { importJson } from "@/settings";


interface State {
    aboutList: Map<number, About>;
};

export const useAboutStore = defineStore({
    id: "abouts",
    state: (): State => {
        return {
            aboutList: new Map<number, About>()
        };
    },
    getters: {
        getById: (state) => {
            return (id: number): About => {
                const about = state.aboutList.get(id) as About;
                return about;
            }
        }
    },
    actions: {
        async initList(): Promise<void> {
            this.aboutList = await createData();
        }
    }
});

async function createData(): Promise<Map<number, About>> {
    const data = await importJson("about");
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