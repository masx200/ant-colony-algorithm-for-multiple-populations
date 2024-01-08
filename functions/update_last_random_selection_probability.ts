//更新随机选择概率
export function update_last_random_selection_probability({
    coefficient_of_diversity_increase,
    last_random_selection_probability,
}: {
    coefficient_of_diversity_increase: number;
    last_random_selection_probability: number;
}): number {
    const nextrandom_selection_probability =
        coefficient_of_diversity_increase / 20;
    last_random_selection_probability = Math.max(
        nextrandom_selection_probability,
        last_random_selection_probability / 10,
    );
    return last_random_selection_probability;
}
