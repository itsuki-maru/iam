export function setTitle(newTitle: string) {
    document.title = newTitle;
}

export async function importJson(target: string) {
    try {
        const response = await fetch("/config.json");
        if (!response.ok) {
            throw new Error("Failed to load JSON");
        }
        const jsonData = await response.json();
        return jsonData[target];
    } catch (error) {
        console.error(error);
    }
};