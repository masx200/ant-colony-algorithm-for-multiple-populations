import { Ref, computed, ref } from "vue";

import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECBasicOption } from "echarts/types/dist/shared";
import { get_options_route_number_and_current_length_chart } from "./get_options_route_number_and_current_length_chart";
import { getoptionsOfIterationAndWorstLength } from "./getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations";

export function useOptionsOfRoutesAndRouteLengthChart() {
    const RouteDataOfIndividualPopulationsRef = ref(
        [] as DataOfFinishOneRoute[][]
    );
    const optionsOfIterationAndAverageLength: Ref<ECBasicOption> = computed(
        () =>
            get_options_route_number_and_current_length_chart(
                RouteDataOfIndividualPopulationsRef.value
            )
    );
    const optionsOfIterationAndWorstLength: Ref<ECBasicOption> = computed(() =>
        getoptionsOfIterationAndWorstLength(
            RouteDataOfIndividualPopulationsRef.value
        )
    );

    function onUpdateRouteDataOfIndividualPopulations(
        RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
    ) {
        if (RouteDataOfIndividualPopulationsRef.value.length == 0) {
            RouteDataOfIndividualPopulationsRef.value =
                RouteDataOfIndividualPopulations;
        } else {
            RouteDataOfIndividualPopulations.forEach((a, i) =>
                RouteDataOfIndividualPopulationsRef.value[i].push(...a)
            );
        }
    }
    return {
        optionsOfIterationAndWorstLength,
        optionsOfIterationAndAverageLength: optionsOfIterationAndAverageLength,
        onUpdateRouteDataOfIndividualPopulations,
    };
}
