import { ECBasicOption } from "echarts/types/dist/shared";

import { ECOption } from "./echarts-line";

export function createMultipleLinesChartOptions({
    title_text,
    xAxis_min,
    yAxis_min,
    datas,
}: {
    title_text: string;
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    datas: [number, number][][];
}): ECBasicOption & ECOption {
    return {
        animation: false,
        title: { text: title_text },
        xAxis: { min: xAxis_min, max: "dataMax" },
        yAxis: { min: yAxis_min, max: "dataMax" },
        series: datas.map((data) => {
            return {
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter(parm) {
                            return (
                                "(" +
                                Array.from([parm.data].flat()).join(",") +
                                ")"
                            );
                        },
                    },
                },
                data: data,
                type: "line",
            };
        }),
    };
}
