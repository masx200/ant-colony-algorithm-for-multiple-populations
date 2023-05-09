<template>
    <div :class="{ 'container-top': navbar_float }">
        <Progress-element
            :class="{ 'fixed-top-navbar': navbar_float }"
            :percentage="percentage"
            :indeterminate="indeterminate"
        />
        <!-- v-show="show_progress" -->
        <h1>多种群:自适应+蚁群+k-opt+动态计算信息素-TSP-测试+种群相似度</h1>
        <hr />
        <span>选择城市地图</span>
        <br />
        <hr />
        <span>当前地图:{{ selected_value }}</span>
        <br />
        <select
            v-model="selected_value"
            ref="selecteleref"
            :disabled="disable_switching"
            @change="submit_select_node_coordinates"
        >
            <option
                v-for="item in TSP_cities_data"
                v-bind:key="item"
                :value="item"
            >
                {{ item }}
            </option>
        </select>
        <br />
        <el-row>
            <el-col :span="12"
                ><el-button @click="resethandler"> 重置 </el-button><br
            /></el-col>
            <el-col :span="12">
                <el-button @click="stop_handler" :disabled="disable_stop"
                    >停止</el-button
                ></el-col
            >
        </el-row>

        <hr />
        <span v-text="'进度:'"></span>
        <span> {{ percentage }}%</span>
        <!-- <el-switch
            v-model="show_progress"
            active-text="Open"
            inactive-text="Close"
        /> -->
        <hr />
        <div>
            <span>显示每次迭代的统计</span>
            <el-radio-group
                v-model="显示每次迭代的统计"
                :disabled="disable_switching"
            >
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio> </el-radio-group
            ><br />
        </div>
        <details
            class="width-100-percent"
            :open="show_configurations"
            @toggle="show_configurations = $event.target.open"
        >
            <summary>蚁群的参数配置</summary>

            <div>
                <MultiplePopulationsConfigs
                    :input_options="input_options"
                    :disable_switching="disable_switching"
                />
            </div>
        </details>

        <hr />
        <span>按照终止条件</span>
        <el-radio-group
            v-model="radio_run_way"
            :disabled="!can_run || is_running"
        >
            <el-radio :label="run_way_time">时间</el-radio>
            <el-radio :label="run_way_round">轮次</el-radio>
        </el-radio-group>
        <div v-show="radio_run_way === run_way_round">
            <span>每个种群的迭代轮次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="searchrounds"
                :min="1"
                :controls="false"
                :disabled="!can_run || is_running"
            />
            <br />
            <span>所有种群的总共迭代轮次数</span>
            <el-input-number
                step-strictly
                :step="1"
                v-model.number="search_rounds_all"
                :min="1"
                :controls="false"
                :disabled="!can_run || is_running"
            />
            <br />
            <button
                v-text="'运行'"
                @click="create_and_run_tsp_by_search_rounds"
                :disabled="!can_run || is_running"
            />
        </div>
        <div v-show="radio_run_way === run_way_time">
            <span>迭代时间秒</span>
            <el-input-number
                step-strictly
                :step="0.001"
                v-model.number="search_time_seconds"
                :min="0.001"
                :controls="false"
                :disabled="!can_run || is_running"
            />
            <br />
            <button
                v-text="'运行'"
                @click="create_and_run_tsp_by_search_time"
                :disabled="!can_run || is_running"
            />
        </div>
        <hr />

        <div class="chart-container" style="">
            <details
                class="width-100-percent"
                :open="show_routes_of_best"
                @toggle="show_routes_of_best = $event.target.open"
            >
                <summary>全局最优路径的展示</summary>
                <!-- 全局最优解的图 -->
                <LineChart
                    v-if="show_routes_of_best"
                    class="single-chart"
                    style=""
                    :options="options_of_best_route_chart"
                ></LineChart>
            </details>

            <!-- 最近一条路径的图 -->
        </div>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_best2"
            @toggle="show_chart_of_best2 = $event.target.open"
        >
            <summary>{{ 迭代次数和全局最优路径长度 }}</summary>
            <LineChart
                v-if="show_chart_of_best2"
                class="single-chart"
                style=""
                :options="optionsOfIterationAndGlobalBestLength"
            ></LineChart>
        </details>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_latest"
            @toggle="show_chart_of_latest = $event.target.open"
        >
            <summary>{{ 迭代次数和相对信息熵 }}</summary>
            <div class="chart-container" style="">
                <LineChart
                    v-if="show_chart_of_latest"
                    class="single-chart"
                    style=""
                    :options="
                        options_of_iterations_and_information_entropy_chart
                    "
                ></LineChart>
            </div>
        </details>
        <details
            class="width-100-percent"
            :open="show_chart_of_latest_similarity"
            @toggle="show_chart_of_latest_similarity = $event.target.open"
        >
            <summary>{{ 迭代次数和种群相似度 }}</summary>
            <div class="chart-container" style="">
                <LineChart
                    v-if="show_chart_of_latest_similarity"
                    class="single-chart"
                    style=""
                    :options="optionsOfIterationsAndPopulationSimilarityChart"
                ></LineChart>
            </div>
        </details>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_entropy"
            @toggle="show_chart_of_entropy = $event.target.open"
        >
            <summary>{{ 迭代次数和迭代平均路径长度 }}</summary>
            <div class="chart-container" style="">
                <LineChart
                    v-if="show_chart_of_entropy"
                    class="single-chart"
                    style=""
                    :options="optionsOfIterationAndIterationAverageLength"
                ></LineChart>
            </div>
        </details>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_best_individual"
            @toggle="show_chart_of_best_individual = $event.target.open"
        >
            <summary>{{ 迭代次数和迭代最差路径长度 }}</summary>
            <LineChart
                class="single-chart"
                v-if="show_chart_of_best_individual"
                style=""
                :options="optionsOfIterationAndIterationWorstLength"
            ></LineChart>
        </details>
        <hr />
        <details
            class="width-100-percent"
            :open="show_chart_of_best"
            @toggle="show_chart_of_best = $event.target.open"
        >
            <summary>{{ 迭代次数和迭代最优路径长度 }}</summary>
            <LineChart
                v-if="show_chart_of_best"
                class="single-chart"
                style=""
                :options="optionsOfIterationAndIterationBestLength"
            ></LineChart>
        </details>
        <hr />

        <!-- //汇总结果 -->
        <Data-table
            style="margin: 0 auto"
            title="最优解的统计"
            :tableheads="summary_best_TableHeads"
            :tablebody="summary_best_TableBody"
        />
        <!-- 拆分表格 -->
        <hr />
        <Data-table
            style="margin: 0 auto"
            title="总体的统计"
            :tableheads="summary_total_TableHeads"
            :tablebody="summary_total_TableBody"
        />
        <!-- 拆分表格 -->
        <hr />
        <details
            :open="show_summary_of_similarity"
            @toggle="show_summary_of_similarity = $event.target.open"
        >
            <summary>总体的相似度和种群交流的方式</summary>
            <Data-table
                style="margin: 0 auto"
                title="总体的相似度和种群交流的方式"
                :tableheads="similarityOfAllPopulationsTableHeads"
                :tablebody="similarityOfAllPopulationsHistoryRef"
            />
        </details>

        <!-- 拆分表格 -->
        <hr />
        <details
            style=""
            class="width-100-percent detail-96CCB01F-4CA6-DB88-D008-F1D1DCFF789D"
            :open="show_array_routes_of_best"
            @toggle="show_array_routes_of_best = $event.target.open"
        >
            <summary>最优路径的数组展示</summary>
            <Data-table
                style="margin: 0 auto"
                title="全局最优路径"
                :tableheads="global_best_routeHeads"
                :tablebody="global_best_routeBody"
            />

            <hr />
        </details>
        <details
            class="width-100-percent"
            :open="show_history_routes_of_best"
            @toggle="show_history_routes_of_best = $event.target.open"
        >
            <summary>最优路径的变化历史</summary>
            <Data-table
                style="margin: 0 auto"
                title="最优路径的变化"
                :tableheads="TableHeadsOfHistoryOfBest"
                :tablebody="TableBodyOfHistoryOfBest"
            />
            <hr />
        </details>

        <Data-table
            style="margin: 0 auto"
            title="贪心路径统计"
            :tableheads="greedy_iteration_table_heads"
            :tablebody="greedy_iteration_table_body"
        />

        <hr />
        <details
            v-if="显示每次迭代的统计"
            style="content-visibility: auto"
            class="width-100-percent"
            :open="显示每次迭代的统计"
            @toggle="显示每次迭代的统计 = $event.target.open"
        >
            <summary>每次迭代的统计</summary>
            <!-- 迭代结果 -->
            <Data-table
                v-if="显示每次迭代的统计"
                style="margin: 0 auto"
                title="每次迭代的统计"
                :tableheads="oneiterationtableheads"
                :tablebody="oneiterationtablebody"
            />
        </details>
        <hr />
    </div>
</template>
<script lang="ts" src="./app-com.ts"></script>
<style scoped>
.detail-96CCB01F-4CA6-DB88-D008-F1D1DCFF789D {
    width: 95%;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.fixed-top-navbar {
    z-index: 10;
    /* height: 30px; */
    position: fixed;
    /* width: 100%; */
    top: 0%;
    left: 0;
}
.single-chart {
    min-height: 300px;
    max-width: 100%;
    width: 100%;
    min-width: 300px;
    /* max-height: 100%; */
    height: 600px;
}
.chart-container {
    max-width: 100%;
    display: flex;
    max-height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
}
@media screen and (max-width: 1000px) {
    /* 小于1000 */
    .chart-container {
        flex-direction: column;
    }
}
/* 小于600 */
@media screen and (max-width: 400px) {
    .single-chart {
        max-height: 400px;
        height: 400px;
    }
}
@media screen and (max-width: 500px) {
    .single-chart {
        height: 500px;
        max-height: 500px;
    }
}
@media screen and (max-width: 600px) {
    .single-chart {
        height: 600px;
        max-height: 600px;
    }
}
/* 大于600 */
@media screen and (min-width: 600px) {
    .single-chart {
        max-height: 600px;
    }
}
/* 大于1000 */
@media screen and (min-width: 1000px) {
    .chart-container {
        flex-direction: row;
    }
}
.container-top {
    margin-top: 30px;
}

.width-100-percent {
    width: 100%;
}
</style>
