import { tanh } from "./tanh";

export function ProbabilityOfPerformingTheFirstCommunication(
    similarity: number,
    Multi_Population_Similarity_evaluation_coefficient: number
) {
    return (
        0.5 +
        tanh(
            10 *
                (similarity -
                    Multi_Population_Similarity_evaluation_coefficient)
        ) /
            2
    );
}
