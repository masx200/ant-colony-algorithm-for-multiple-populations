import { createApp, h } from "vue";
import "../functions/echarts-line";
import appcom from "./app-com.vue";
import "./style.css";
document.title = "ant-colony-algorithm-for-multiple-populations";

export const app = createApp({
    render() {
        return h(appcom);
    },
});
