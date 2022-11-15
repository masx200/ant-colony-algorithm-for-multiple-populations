import { ECBasicOption } from "echarts/types/dist/shared";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { ECOption } from "../functions/echarts-line";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";

export function getOptionsOfIterationsAndPopulationSimilarityChart(
    IterationDataOfIndividualPopulations: DataOfFinishOneIteration[][]
): ECBasicOption & ECOption {
    const title_text = "迭代轮次和种群相似度";

    const datas: [number, number][][] =
        IterationDataOfIndividualPopulations.map((a) =>
            a.map((d, i) => [i + 1, d.Intra_population_similarity])
        );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
