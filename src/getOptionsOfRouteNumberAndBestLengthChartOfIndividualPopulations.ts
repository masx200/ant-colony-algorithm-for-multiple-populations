import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECBasicOption } from "echarts/types/dist/shared";
import { ECOption } from "../functions/echarts-line";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
export const 迭代次数和迭代最差路径长度 = "迭代次数和迭代最差路径长度";
export function getoptionsOfIterationAndWorstLength(
    RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
): ECBasicOption & ECOption {
    const title_text = 迭代次数和迭代最差路径长度;

    const datas: [number, number][][] = RouteDataOfIndividualPopulations.map(
        (a) => a.map((d, i) => [i + 1, d.global_best_length])
    );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
