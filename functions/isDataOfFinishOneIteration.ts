import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";

export function isDataOfFinishOneIteration(
    data: DataOfFinishOneIteration | DataOfFinishOneRoute | undefined
): data is DataOfFinishOneIteration {
    return typeof (data as any)?.current_iterations === "number";
}
