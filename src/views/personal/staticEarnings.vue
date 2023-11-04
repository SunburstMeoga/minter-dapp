<template>
    <div id="staticEarnings" style="height: 180px;"></div>
</template>
<script setup>
import {
    onMounted
} from "vue";
import * as echarts from 'echarts'
onMounted(() => {
    let myChart = echarts.init(document.getElementById("staticEarnings"));
    myChart.setOption({
        tooltip: {
            // formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                progress: {
                    show: true,
                    overlap: true,
                    width: 10,
                    roundCap: false,
                    clip: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    fontSize: '14px',
                    color: '#fff',
                    borderColor: '#e149ed',
                    width: 50,
                    height: 10

                },
                data: [
                    {
                        value: 80,
                        name: '静态收益'
                    }
                ],
                radius: '90%',
                title: {
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 'small'
                },
                color: '#e149ed',
                gradientColor: [
                    "e149ed",
                    "e149ed",
                    "e149ed"

                ]
            }
        ]
    });
    window.onresize = function () {
        myChart.resize();
    };
})
</script>
