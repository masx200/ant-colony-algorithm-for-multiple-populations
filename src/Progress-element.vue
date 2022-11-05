<template>
    <div class="progress-bar Translucent-background">
        <el-progress
            class="Translucent-background"
            :percentage="percentage"
            textInside
            :strokeWidth="25"
            :indeterminate="indeterminate"
        />
    </div>
</template>
<script lang="ts" src="./Progress-element.ts"></script>
<style scoped>
.progress-bar {
    /* z-index: 10; */
    height: 30px;
    /* position: fixed; */
    width: 100%;
    /* top: 0%; */
    /* left: 0; */
}
</style>
