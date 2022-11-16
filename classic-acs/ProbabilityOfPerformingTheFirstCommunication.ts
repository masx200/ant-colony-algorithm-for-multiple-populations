import { tanh } from "./tanh";

export function ProbabilityOfPerformingTheFirstCommunication(
    similarity: number
) {
    return 0.5 + tanh(10 * (similarity - 0.8)) / 2;
}
