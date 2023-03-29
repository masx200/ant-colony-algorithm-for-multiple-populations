import { Ref, computed } from "vue";

// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECBasicOption } from "echarts/types/dist/shared";
import { get_options_route_number_and_current_length_chart } from "./get_options_route_number_and_current_length_chart";
import { getoptionsOfIterationAndIterationWorstLength } from "./getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations";

export function useOptionsOfRoutesAndRouteLengthChart(
    IterationDataOfIndividualPopulationsRef: Ref<
        {
            current_iterations: number;
            global_best_length: number;
            iterate_best_length: number;
            population_relative_information_entropy: number;
            average_length_of_iteration: number;
            worst_length_of_iteration: number;
            time_ms_of_one_iteration: number;
            random_selection_probability: number;
            optimal_length_of_iteration: number;
            convergence_coefficient: number;
            id_Of_Population?: number | undefined;
            Intra_population_similarity: number;
            ClassOfPopulation?: string | undefined;
        }[][]
    >
) {
    // const RouteDataOfIndividualPopulationsRef = ref(
    //     [] as DataOfFinishOneRoute[][]
    // );
    const optionsOfIterationAndIterationAverageLength: Ref<ECBasicOption> =
        computed(() =>
            get_options_route_number_and_current_length_chart(
                IterationDataOfIndividualPopulationsRef.value
            )
        );
    const optionsOfIterationAndIterationWorstLength: Ref<ECBasicOption> =
        computed(() =>
            getoptionsOfIterationAndIterationWorstLength(
                IterationDataOfIndividualPopulationsRef.value
            )
        );

    // function onUpdateRouteDataOfIndividualPopulations(
    //     RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
    // ) {
    //     if (RouteDataOfIndividualPopulationsRef.value.length == 0) {
    //         RouteDataOfIndividualPopulationsRef.value =
    //             RouteDataOfIndividualPopulations;
    //     } else {
    //         RouteDataOfIndividualPopulations.forEach((a, i) =>
    //             RouteDataOfIndividualPopulationsRef.value[i].push(...a)
    //         );
    //     }
    // }
    return {
        optionsOfIterationAndIterationWorstLength,
        optionsOfIterationAndIterationAverageLength:
            optionsOfIterationAndIterationAverageLength,
        // onUpdateRouteDataOfIndividualPopulations,
    };
}
