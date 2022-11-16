import { ECBasicOption } from "echarts/types/dist/shared";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";

import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";

import { ECOption } from "../functions/echarts-line";

export function getOptionsOfRouteNumberAndBestLengthChartOfIndividualPopulations(
    RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
): ECBasicOption & ECOption {
    const title_text = "分别的路径序号和最优路径长度";

    const datas: [number, number][][] = RouteDataOfIndividualPopulations.map(
        (a) => a.map((d, i) => [i + 1, d.global_best_length])
    );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
