import { ECBasicOption } from "echarts/types/dist/shared";
import { computed, Ref, ref } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations } from "./getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations";
import { get_options_route_number_and_current_length_chart } from "./get_options_route_number_and_current_length_chart";
export function useOptionsOfRoutesAndRouteLengthChart() {
    const RouteDataOfIndividualPopulationsRef = ref(
        [] as DataOfFinishOneRoute[][]
    );
    const options_of_current_path_length_chart: Ref<ECBasicOption> = computed(
        () =>
            get_options_route_number_and_current_length_chart(
                RouteDataOfIndividualPopulationsRef.value
            )
    );
    const OptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations: Ref<ECBasicOption> =
        computed(() =>
            getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations(
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
        OptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations,
        options_of_current_path_length_chart,
        onUpdateRouteDataOfIndividualPopulations,
    };
}
