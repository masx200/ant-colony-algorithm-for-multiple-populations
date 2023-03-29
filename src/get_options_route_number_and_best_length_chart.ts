import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECBasicOption } from "echarts/types/dist/shared";
import { ECOption } from "../functions/echarts-line";
import { create_line_chart_options } from "../functions/create_line_chart_options";
export const 迭代次数和最优路径长度 = "迭代次数和最优路径长度";
export function get_options_route_number_and_best_length_chart(
    dataofoneroute: DataOfFinishOneRoute[]
): ECBasicOption & ECOption {
    const title_text = 迭代次数和最优路径长度;

    const data: [number, number][] = dataofoneroute.map((a, i) => [
        i + 1,
        a.global_best_length,
    ]);
    // console.log(data);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
    });
}
