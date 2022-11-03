import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";

export function isDataOfFinishOneRoute(
    data: DataOfFinishOneIteration | DataOfFinishOneRoute | undefined
): data is DataOfFinishOneRoute {
    return typeof (data as any)?.current_search_count === "number";
}
