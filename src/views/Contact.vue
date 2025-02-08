<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import type { ContactFormField } from "@/interface";
import { jsonConfig } from "@/config";


const contactData = jsonConfig["contact"];
const pageTitle = ref<string>(contactData["title"]);
const postUrl = ref<string>(contactData["postUrl"]);
const postcomplateMessage = ref<string>(contactData["postcomplateMessage"]);

function createData(): Map<number, ContactFormField> {
    const data = jsonConfig["contact"];
    let newData = new Map<number, ContactFormField>();

    let id = 1;

    for (let item of data["form"]) {
        newData.set(id, {
            name: item.name,
            label: item.label,
            placeholder: item.placeholder,
            type: item.type,
            selects: item.selects ?? [],
        });
        id++;
    }
    return newData;
}

const formFieldList = createData();

// バインディングデータの初期化
const formFieldRef = ref<Map<number, ContactFormField>>(formFieldList); // v-for用
const formDataRef = ref<Record<number, string | number>>({}); // v-model用
for (let [key, value] of formFieldRef.value) {
    if (value.type === "textbox") {
        formDataRef.value[key] = "";
    } else if (value.type === "number") {
        formDataRef.value[key] = 20;
    } else if (value.type === "email") {
        formDataRef.value[key] = "";
    } else if (value.type === "textarea") {
        formDataRef.value[key] = "";
    } else if (value.type = "select") {
        formDataRef.value[key] = "";
    }
}

const postData = async (): Promise<void> => {
    const payload: Record<string, any> = {};
    for (let [key, value] of Object.entries(formDataRef.value)) {
        const name = formFieldRef.value.get(Number(key))?.["name"];
        const label = formFieldRef.value.get(Number(key))?.["label"];
        if (value && name !== undefined) {
            payload[name] = value;
        } else {
            infomationActiveData.value = `【 ${label} 】 を正しく入力してください。`;
            handleOpenModal();
            return;
        }
    }
    try {
        const response = await axios.post(
            postUrl.value,
            payload
        );
        infomationActiveData.value = postcomplateMessage.value;
        handleOpenModal();
    } catch (error) {
        console.error(error);
    }
}

const isOpenInfomationModal = ref(false);
const infomationActiveData = ref("");
const handleOpenModal = () => {
    if (isOpenInfomationModal.value) {
        isOpenInfomationModal.value = false;
        infomationActiveData.value = "";
    } else {
        isOpenInfomationModal.value = true;
    }
}

onMounted(() => {
    const infomationModal = document.getElementById("overlay-message");
    const infomationModalContent = document.getElementById("content-message");
    if (infomationModal) {
        infomationModal.addEventListener("click", function (event) {
            if (isOpenInfomationModal.value === true) {
                isOpenInfomationModal.value = false
            } else {
                return;
            }
        });
    }
    // 灰色の部分以外（content-message）をクリックした時にはイベント伝搬を止め、クローズさせない
    if (infomationModalContent) {
        infomationModalContent.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }
});
</script>

<template>
    <!-- Contact Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>{{ pageTitle }}</h2>
            <div id="form-area">
                <div v-for="[id, field] in formFieldRef" :key="id" class="row">
                    <label>{{ field.label }}</label>
                    <!-- テキストボックス & 数値入力 -->
                    <input
                        v-if="field.type === 'textbox' || field.type === 'number'"
                        :type="field.type === 'textbox' ? 'text' : 'number'"
                        v-model="formDataRef[id]"
                        :placeholder="field.placeholder"
                    />

                    <!-- メールアドレス -->
                    <input
                        v-if="field.type === 'email'"
                        type="email"
                        v-model="formDataRef[id]"
                    >

                    <!-- セレクトボックス -->
                    <div v-else-if="field.type === 'select'">
                        <select v-model="formDataRef[id]" class="select">
                            <option value="" disabled selected>{{ field.placeholder }}</option>
                            <option :value="select" v-for="select in field.selects ?? []">{{ select }}</option>
                        </select>
                    </div>
                    
                    <!-- テキストエリア -->
                    <textarea
                        v-else-if="field.type === 'textarea'"
                        v-model="formDataRef[id]"
                        :placeholder="field.placeholder"
                    ></textarea>
                </div>
                <button v-on:click="postData">送信</button>
            </div>
        </div>
    </section>
    
    <!-- 各種メッセージモーダル -->
    <div id="overlay-message" v-show="isOpenInfomationModal">
        <div id="content-message">
            <h2>メッセージ</h2>
            <div class="input-text-zone">
                <p class="message-text"><strong>{{ infomationActiveData }}</strong></p>
            </div>
            <div class="btn-zone">
                <button v-on:click="handleOpenModal()   " class="btn-modal-yes">閉じる</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#form-area {
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    margin-top: -20px;
    padding: 20px;
    border-radius: 8px;
    box-sizing: border-box;
}

.row {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 14px;
}

input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #acacac;
    border-radius: 4px;
    font-size: 14px;
    transition: border 0.3s, box-shadow 0.3s;
    box-sizing: border-box;
    text-align: center;
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: center;
}

.checkbox-group label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    white-space: nowrap;
}

input:focus, textarea:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}

select {
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-family: inherit;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    background-color: var(--input-text-texaarea-background-color);
    color: var(--input-text-texaarea-color);
    border-color: #555;
    border: 1px solid #ccc;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-repeat: no-repeat;
    background-position: right 1em center;
    padding-right: 2.5em;
    text-align: center;
}

select:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

select:hover {
    border-color: #888;
}

textarea {
    min-height: 100px;
    resize: vertical;
}

#overlay-message {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

#content-message {
    z-index: 11;
    width: 40%;
    padding: 1em;
    color: #000000;
    border: solid #e1e1e1 1px;
    border-radius: 10px;
}


@media (prefers-color-scheme: light) {
    #content-message {
        background: #f1f1f1;
    }

    button {
        background-color: #e3e3e3;
    }
    
    button:hover {
        background-color: #cdcdcd;
    }
    
    .list-list li {
        background-color: #efefef;
    }
}

@media (prefers-color-scheme: dark) {
    #content-message {
        background: #e1e1e1;
    }

    button {
        background-color: #313131;
    }
    
    button:hover {
        background-color: #1a1a1a;
    }
    
    .list-list li {
        background-color: #0e0e0e;
    }
}

[data-theme="light"] {
    #content-message {
        background: #f1f1f1;
    }

    button {
        color: #1a1a1a;
        background-color: #e3e3e3;
    }
    
    button:hover {
        background-color: #cdcdcd;
    }
    
    .list-list li {
        background-color: #efefef;
    }
}

[data-theme="dark"] {
    #content-message {
        background: #e1e1e1;
    }

    button {
        color: #f0f0f0;
        background-color: #313131;
    }
    
    button:hover {
        background-color: #1a1a1a;
    }
    
    .list-list li {
        background-color: #0e0e0e;
    }
}


@media (max-width: 768px) {
    #form-area {
        max-width: 100%; /* 画面幅にフィットさせる */
        padding: 15px; /* 余白を調整 */
    }

    input, textarea {
        font-size: 16px; /* モバイルでの操作性向上 */
    }
}
</style>