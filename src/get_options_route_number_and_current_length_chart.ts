import { ECBasicOption } from "echarts/types/dist/shared";
import { createMultipleLinesChartOptions } from "../functions/createMultipleLinesChartOptions";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECOption } from "../functions/echarts-line";

export function get_options_route_number_and_current_length_chart(
    RouteDataOfIndividualPopulations: DataOfFinishOneRoute[][]
): ECBasicOption & ECOption {
    const title_text = "路径序号和当前路径长度";

    const datas: [number, number][][] = RouteDataOfIndividualPopulations.map(
        (a) => a.map((d, i) => [i + 1, d.current_route_length])
    );
    return createMultipleLinesChartOptions({
        yAxis_min: 0,
        title_text,
        datas: datas,
    });
}
