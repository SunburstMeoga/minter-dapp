<template>
    <div class="w-full h-full flex flex-col items-center justify-center text-primary-color">
        <div class="w-11/12 mb-8">
            <module-title titleWord="介紹" />
        </div>
        <div class="font-black text-2xl w-11/12 mb-8 title">
            明德配套項目
        </div>
        <div class="w-11/12 text-sm mb-8 present-word">
            配套项目是以Hash
            Ahead公链为底层开发的市场推广项目。公链项目上线初期，吸引用户并建立起一个活跃的用户群体对项目的成功至关重要。因此，开展用户引流项目，旨在快速扩大项目的知名度、吸引更多的用户参与，并为项目的长期发展打下坚实基础。<span class="underline ">可点击下方名词查看名词定义</span>
        </div>
        <!-- <div class="w-11/12">
            <img src="../../assets/nft-bg.png" alt="">
        </div> -->
        <div class="flex justify-between items-start mb-3 w-11/12">
            <div class="flex flex-col justify-center items-center">
                <div class="circle-module text-primary-color p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full">
                        PMT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目代币，当用户购买配套后释放
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="circle-module text-primary-color p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full">
                        MT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目中可交易的NFT
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="circle-module text-primary-color p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full">
                        RT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目代币，仅通过MT和流动性奖励token积分获取，又称为初始资金凭证
                </div> -->
            </div>
        </div>
        <div class="flex justify-between items-start w-11/12">
           
            <div class="flex flex-col justify-center items-center">
                <div class="circle-module text-primary-color p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full">
                        PV
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    业绩值
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="circle-module text-primary-color p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full">
                        MUSDT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    平台稳定币
                </div> -->
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="circle-module text-primary-color p-2 rounded-full flex justify-center items-center mb-2">
                    <div class="w-20 h-20 font-bold flex justify-center items-center bg-black rounded-full">
                        BT
                    </div>
                </div>
                <!-- <div class="text-sm w-16 text-center" style="color: #c972c3;">
                    项目中动态业绩的结算货币，又称流动性奖励Token
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from '@/components/ModuleTitle.vue';
</script>

<style  scoped>
.title {
    text-shadow: 1px -1px #fff, -1px 1px #999, -10 10px 5px #808080;
}
</style>