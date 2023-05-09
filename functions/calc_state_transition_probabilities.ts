import { GetDistanceBySerialNumber } from "./GetDistanceBySerialNumber";
import { GetPheromone } from "./GetPheromone";
import { assert_true } from "../test/assert_true";

export function calc_state_transition_probabilities({
    getpheromone,
    nextnode,
    currentnode,
    alpha,
    getdistancebyserialnumber,
    beta,
}: {
    getpheromone: GetPheromone;
    nextnode: number;
    currentnode: number;
    alpha: number;
    getdistancebyserialnumber: GetDistanceBySerialNumber;
    beta: number;
}) {
    const pheromone = getpheromone(nextnode, currentnode);
    assert_true(!Number.isNaN(pheromone), "pheromone should not be NaN");

    const weight =
        Math.pow(pheromone, alpha) /
        Math.pow(getdistancebyserialnumber(nextnode, currentnode), beta);

    assert_true(!Number.isNaN(weight), "weight should not be NaN");

    return Math.max(0, weight);
}
