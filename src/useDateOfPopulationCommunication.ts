import { ref } from "vue";
import { MultiPopulationOutput } from "../classic-acs/MultiPopulationOutput";

export function useDateOfPopulationCommunication() {
    const similarityOfAllPopulationsHistoryRef = ref(
        [] as [number, number, string, boolean][],
    );

    const similarityOfAllPopulationsTableHeads = [
        "序号",
        "总体的相似度",
        "种群交流的方式",
        "更新所有最优解",
    ];
    function onReceiveDataOfPopulationCommunication(
        data: MultiPopulationOutput,
    ) {
        similarityOfAllPopulationsHistoryRef.value =
            data.similarityOfAllPopulationsHistory.map((v, i) => [
                i + 1,
                v,
                data.HistoryOfTheWayPopulationsCommunicate[i],
                data.HistoryOfPopulationsAllUpdateBestRoute[i],
            ]);
    }
    return {
        similarityOfAllPopulationsHistoryRef,
        onReceiveDataOfPopulationCommunication,
        similarityOfAllPopulationsTableHeads,
    };
}
