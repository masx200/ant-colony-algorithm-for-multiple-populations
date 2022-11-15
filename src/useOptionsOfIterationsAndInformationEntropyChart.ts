import { ECBasicOption } from "echarts/types/dist/shared";
import { computed, Ref, ref } from "vue";
import { get_options_iterations_and_information_entropy_chart } from "./get_options_iterations_and_information_entropy_chart";
import { COMMON_DataOfOneIteration } from "../classic-acs/tsp-interface";
import { getOptionsOfIterationsAndPopulationSimilarityChart } from "./getOptionsOfIterationsAndPopulationSimilarityChart";
export function useOptionsOfIterationsAndInformationEntropyChart(): {
    optionsOfIterationsAndPopulationSimilarityChart: Ref<ECBasicOption>;
    options_of_iterations_and_information_entropy_chart: Ref<ECBasicOption>;
    onUpdateIterationDataOfIndividualPopulations: (
        IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][]
    ) => void;
} {
    const IterationDataOfIndividualPopulationsRef = ref(
        [] as COMMON_DataOfOneIteration[][]
    );
    const options_of_iterations_and_information_entropy_chart: Ref<ECBasicOption> =
        computed(() =>
            get_options_iterations_and_information_entropy_chart(
                IterationDataOfIndividualPopulationsRef.value
            )
        );
    const optionsOfIterationsAndPopulationSimilarityChart: Ref<ECBasicOption> =
        computed(() =>
            getOptionsOfIterationsAndPopulationSimilarityChart(
                IterationDataOfIndividualPopulationsRef.value
            )
        );
    function onUpdateIterationDataOfIndividualPopulations(
        IterationDataOfIndividualPopulations: COMMON_DataOfOneIteration[][]
    ) {
        if (IterationDataOfIndividualPopulationsRef.value.length == 0) {
            IterationDataOfIndividualPopulationsRef.value =
                IterationDataOfIndividualPopulations;
        } else {
            IterationDataOfIndividualPopulations.forEach((a, i) =>
                IterationDataOfIndividualPopulationsRef.value[i].push(...a)
            );
        }
    }
    return {
        optionsOfIterationsAndPopulationSimilarityChart,
        options_of_iterations_and_information_entropy_chart,
        onUpdateIterationDataOfIndividualPopulations,
    };
}
