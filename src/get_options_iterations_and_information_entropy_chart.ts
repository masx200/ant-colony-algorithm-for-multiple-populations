import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { ECBasicOption } from "echarts/types/dist/shared";
import { ECOption } from "../functions/echarts-line";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
export const 迭代次数和相对信息熵 = "迭代次数和相对信息熵";
export function get_options_iterations_and_information_entropy_chart(
    IterationDataOfIndividualPopulations: DataOfFinishOneIteration[][]
): ECBasicOption & ECOption {
    const title_text = 迭代次数和相对信息熵;

    const datas: [number, number][][] =
        IterationDataOfIndividualPopulations.map((a) =>
            a.map((d, i) => [i + 1, d.population_relative_information_entropy])
        );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
