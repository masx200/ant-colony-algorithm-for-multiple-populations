import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
// import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
// import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECBasicOption } from "echarts/types/dist/shared";
import { ECOption } from "../functions/echarts-line";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
// import { create_line_chart_options } from "../functions/create_line_chart_options";
export const 迭代次数和迭代最优路径长度 = "迭代次数和迭代最优路径长度";
export function get_options_route_number_and_best_length_chart(
    RouteDataOfIndividualPopulations: DataOfFinishOneIteration[][]
): ECBasicOption & ECOption {
    const title_text = 迭代次数和迭代最优路径长度;

    const datas: [number, number][][] = RouteDataOfIndividualPopulations.map(
        (a) => a.map((d, i) => [i + 1, d.optimal_length_of_iteration])
    );
    // console.log(data);
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
