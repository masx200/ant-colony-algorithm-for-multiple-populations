<template>
    <div>
        <div
            style="
                border-top: thick;
                border-color: #2196f3;
                border-width: thick;
                padding: 10px;
                border: 5px solid #2196f3;
            "
        >
            <div>
                <span>交流方式的策略</span>
                <el-radio-group
                    v-model="input_options.CommunicationStrategy"
                    :disabled="disable_switching"
                >
                    <el-radio :label="CommunicationStrategy.All">全部</el-radio>
                    <el-radio :label="CommunicationStrategy.First"
                        >第一种</el-radio
                    >
                    <el-radio :label="CommunicationStrategy.Second"
                        >第二种</el-radio
                    >
                    <el-radio :label="CommunicationStrategy.Third"
                        >第三种</el-radio
                    > </el-radio-group
                ><br />
            </div>
            <span>结果四舍五入</span>
            <el-radio-group
                v-model="input_options.distance_round"
                :disabled="disable_switching"
            >
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio> </el-radio-group
            ><br />
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
            <span>信息素交流挥发系数</span>
            <el-input-number
                step-strictly
                :step="0.1"
                v-model.number="
                    input_options.pheromone_volatilization_coefficient_of_communication
                "
                :disabled="disable_switching"
                :min="0.1"
                :controls="false"
            /><br />
            <span>多种群相似度评价系数</span>
            <el-input-number
                step-strictly
                :step="0.01"
                v-model.number="
                    input_options.Multi_Population_Similarity_evaluation_coefficient
                "
                :disabled="disable_switching"
                :min="0.1"
                :controls="false"
            /><br />
            <span>相对信息熵因子</span>
            <el-input-number
                step-strictly
                :step="0.01"
                v-model.number="
                    input_options.relative_Information_Entropy_Factor
                "
                :disabled="disable_switching"
                :min="0.1"
                :controls="false"
            /><br />
            <span>最大停滞次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_number_of_stagnation"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />
            <span>最优路径的集合最大大小</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="
                    input_options.max_size_of_collection_of_optimal_routes
                "
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />

            <span>状态转移规则的每步最多可选城市数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_cities_of_state_transition"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />
            <span>贪心算法的每步最多城市数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_cities_of_greedy"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />
            <span>查找交叉点的最大线段数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_segments_of_cross_point"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />
            <span>贪心算法路径数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_routes_of_greedy"
                :disabled="disable_switching"
                :min="2"
                :controls="false"
            /><br /><span>每条的k-opt最大数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_results_of_k_opt"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />
            <span>每条的k-exchange最大次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_results_of_k_exchange"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br /><span>每条的2-opt最大次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.max_results_of_2_opt"
                :disabled="disable_switching"
                :min="1"
                :controls="false"
            /><br />

            <span>蚂蚁数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="input_options.count_of_ants"
                :disabled="disable_switching"
                :min="2"
                :controls="false"
            /><br />
            <span>第一类的信息素因子</span>
            <el-input-number
                :controls="false"
                step-strictly
                :step="0.001"
                v-model.number="input_options.alpha_zero"
                :disabled="disable_switching"
                :min="0.001"
                :max="5"
            /><br />
            <span>第一类的启发式因子</span>
            <el-input-number
                :controls="false"
                step-strictly
                :step="0.001"
                v-model.number="input_options.beta_zero"
                :disabled="disable_switching"
                :min="0.001"
                :max="10"
            /><br />

            <hr />

            <span>第一类种群的数量</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="
                    input_options.number_of_populations_of_the_first_category
                "
                :disabled="disable_switching"
                :min="0"
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
                :min="0"
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
                :step="0.01"
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
    </div>
</template>
<script lang="ts" src="./multiple-populations-configs.ts"></script>
