import { reactive } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";

export function use_data_of_one_route(): {
    dataofoneroute: DataOfFinishOneRoute[];
    onreceivedataofoneroute: (datas: DataOfFinishOneRoute[]) => void;
    clearDataOfOneRoute: () => void;
} {
    function onreceivedataofoneroute(datas: DataOfFinishOneRoute[]): void {
        if (datas.length > dataofoneroute.length) {
            for (let i = dataofoneroute.length; i < datas.length; i++) {
                const data = datas[i];
                dataofoneroute.push(data);
            }
        }
    }

    function clearDataOfOneRoute() {
        dataofoneroute.length = 0;
    }
    const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);

    const result = {
        dataofoneroute,

        onreceivedataofoneroute,
        clearDataOfOneRoute,
    };
    return result;
}
