<template>
    <div id="main" style="height: 300px;"></div>
</template>
<script setup>
import {
    onMounted
} from "vue";
import * as echarts from 'echarts'
onMounted(() => {
    let myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                progress: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                },
                data: [
                    {
                        value: 50,
                        name: 'SCORE'
                    }
                ]
            }
        ]
    });
    window.onresize = function () {
        myChart.resize();
    };
})
</script>
