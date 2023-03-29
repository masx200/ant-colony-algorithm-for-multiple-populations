import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECBasicOption } from "echarts/types/dist/shared";
import { ECOption } from "../functions/echarts-line";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
export const 迭代次数和平均路径长度 = "迭代次数和平均路径长度";
export function get_options_route_number_and_current_length_chart(
    RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
): ECBasicOption & ECOption {
    const title_text = 迭代次数和平均路径长度;

    const datas: [number, number][][] = RouteDataOfIndividualPopulations.map(
        (a) => a.map((d, i) => [i + 1, d.current_route_length])
    );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
