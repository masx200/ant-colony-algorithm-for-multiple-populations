<template>
    <div>
        <span>第一类种群的数量</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="
                input_options.number_of_populations_of_the_first_category
            "
            :disabled="disable_switching"
            :min="1"
            :controls="false"
        /><br />
        <span>第二类种群的数量</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="
                input_options.number_of_the_second_type_of_population
            "
            :disabled="disable_switching"
            :min="1"
            :controls="false"
        /><br />
        <span>种群的迭代交流周期</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="
                input_options.population_communication_iterate_cycle
            "
            :disabled="disable_switching"
            :min="1"
            :controls="false"
        /><br />
        <span>第二类的信息素因子</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="
                input_options.alpha_for_the_second_type_of_population
            "
            :disabled="disable_switching"
            :min="1"
            :controls="false"
        /><br />
        <span>第二类的启发式因子</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="
                input_options.beta_for_the_second_type_of_population
            "
            :disabled="disable_switching"
            :min="1"
            :controls="false"
        /><br />
        <span>全局信息素挥发系数</span>
        <el-input-number
            step-strictly
            :step="0.1"
            v-model.number="
                input_options.global_pheromone_volatilization_coefficient
            "
            :disabled="disable_switching"
            :min="0.1"
            :controls="false"
        /><br />
        <span>局部信息素挥发系数</span>
        <el-input-number
            step-strictly
            :step="0.1"
            v-model.number="
                input_options.local_pheromone_volatilization_coefficient
            "
            :disabled="disable_switching"
            :min="0.1"
            :controls="false"
        /><br />
        <span>路径选择参数q0最小值</span>
        <el-input-number
            step-strictly
            :step="0.1"
            v-model.number="input_options.path_selection_parameter_q0_min"
            :disabled="disable_switching"
            :min="0.1"
            :controls="false"
        /><br />
        <span>路径选择参数q0最大值</span>
        <el-input-number
            step-strictly
            :step="0.1"
            v-model.number="input_options.path_selection_parameter_q0_max"
            :disabled="disable_switching"
            :min="0.1"
            :controls="false"
        /><br />
        <span>判断相似度的周期</span>
        <el-input-number
            step-strictly
            :step="1"
            v-model.number="input_options.Period_of_judgment_similarity"
            :disabled="disable_switching"
            :min="1"
            :controls="false"
        /><br />
        <span>相似度过高的阈值</span>
        <el-input-number
            step-strictly
            :step="0.1"
            v-model.number="input_options.High_similarity_threshold"
            :disabled="disable_switching"
            :min="0.1"
            :controls="false"
        /><br />
        <span>信息素削弱后的最小的系数</span>
        <el-input-number
            step-strictly
            :step="0.1"
            v-model.number="
                input_options.Coefficient_of_the_minimum_after_pheromone_weakening
            "
            :disabled="disable_switching"
            :min="0.1"
            :controls="false"
        /><br />
    </div>
</template>
<script lang="ts" src="./multiple-populations-configs.ts"></script>
