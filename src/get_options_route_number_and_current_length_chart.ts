import { ECBasicOption } from "echarts/types/dist/shared";
import { create_line_chart_options } from "../functions/create_line_chart_options";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { ECOption } from "../functions/echarts-line";

export function get_options_route_number_and_current_length_chart(
    dataofoneroute: DataOfFinishOneRoute[]
): ECBasicOption & ECOption {
    const title_text = "路径序号和当前路径长度";

    const data: [number, number][] = dataofoneroute.map((a, i) => [
        i + 1,
        a.current_route_length,
    ]);
    return create_line_chart_options({
        yAxis_min: 0,
        title_text,
        data: data,
    });
}
