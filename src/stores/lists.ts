import { defineStore } from "pinia";
import type { List } from "@/interface";
import { importJson } from "@/settings";

interface State {
    listList: Map<number, List>;
};

export const useListStore = defineStore({
    id: "lists",
    state: (): State => {
        return {
            listList: new Map<number, List>()
        };
    },
    getters: {
        getById: (state) => {
            return (id: number): List => {
                const list = state.listList.get(id) as List;
                return list;
            }
        }
    },
    actions: {
        async initList(): Promise<void> {
            this.listList = await createData();
        }
    }
});

async function createData(): Promise<Map<number, List>> {
    const data = await importJson("list");
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