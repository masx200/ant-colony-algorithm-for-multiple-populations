import { ECBasicOption } from "echarts/types/dist/shared";

import { create_line_chart_options } from "../functions/create_line_chart_options";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";

import { ECOption } from "../functions/echarts-line";

export function get_options_route_number_and_best_length_chart(
    dataofoneroute: DataOfFinishOneRoute[]
): ECBasicOption & ECOption {
    const title_text = "路径序号和最优路径长度";

    const data: [number, number][] = dataofoneroute.map((a) => [
        a.current_search_count,
        a.global_best_length,
    ]);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
    });
}
