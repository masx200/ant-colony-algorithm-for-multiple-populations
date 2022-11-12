import { reactive } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";

export function use_data_of_one_route(): {
    dataofoneroute: DataOfFinishOneRoute[];
    onReceiveDeltaDataOfOneRoute: (delta_data: DataOfFinishOneRoute[]) => void;
    clearDataOfOneRoute: () => void;
} {
    function onReceiveDeltaDataOfOneRoute(
        delta_data: DataOfFinishOneRoute[]
    ): void {
        for (let i = 0; i < delta_data.length; i++) {
            const data = delta_data[i];
            dataofoneroute.push(data);
        }
    }

    function clearDataOfOneRoute() {
        dataofoneroute.length = 0;
    }
    const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);

    const result = {
        dataofoneroute,

        onReceiveDeltaDataOfOneRoute,
        clearDataOfOneRoute,
    };
    return result;
}
