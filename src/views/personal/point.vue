<template>
    <div class="text-white bg-black">
        <div class="w-full flex flex-col items-center justify-start pt-2">
            <div class="w-11/12 mr-auto ml-auto mt-4 mb-4">
                <module-title titleWord="点位图" />
            </div>
            <div class="w-16 p-1 h-16 operating-button rounded-full overflow-hidden mb-2">
                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                    <img src="../../assets/images/avtor.gif" alt="">
                </div>
            </div>
            <div class="text-center text-xs">
                地址:0x17a...5796
            </div>
            <div class="text-center text-xs">
                全部pv: 500 - 100
            </div>
            <div class="text-center text-xs mb-1">
                剩余pv: 50 - 10
            </div>
            <div class="w-1 h-10 border-l border-primary-color" />
            <div class="w-6/12 h-10 border-t border-l border-r border-primary-color" />
            <div class="flex w-full justify-between items-start">
                <div class="w-6/12 flex justify-start flex-col items-center">
                    <div class="w-14 p-1 h-14 operating-button rounded-full overflow-hidden mb-2">
                        <div class="bg-black w-full h-full rounded-full overflow-hidden">
                            <img src="../../assets/images/avtor.gif" alt="">
                        </div>
                    </div>
                    <div class="text-center text-xs">
                        地址:0x17a...5796
                    </div>
                    <div class="text-center text-xs">
                        全部pv: 500 - 100
                    </div>
                    <div class="text-center text-xs mb-1">
                        剩余pv: 50 - 10
                    </div>
                    <div class="w-1 h-10 border-l border-primary-color" />
                    <div class="w-6/12 h-10 border-t border-l border-r border-primary-color" />
                    <div class="flex w-full  items-start">
                        <div class="w-6/12 flex justify-start flex-col items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                            </div>
                            <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                        </div>
                        <div class="w-6/12 flex justify-start flex-col items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                            </div>
                            <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                        </div>
                    </div>
                </div>
                <div class="w-6/12 flex flex-col justify-start items-center">
                    <div class="w-14 p-1 h-14 operating-button rounded-full overflow-hidden mb-2">
                        <div class="bg-black w-full h-full rounded-full overflow-hidden">
                            <img src="../../assets/images/avtor.gif" alt="">
                        </div>
                    </div>
                    <div class="text-center text-xs">
                        地址:0x17a...5796
                    </div>
                    <div class="text-center text-xs">
                        全部pv: 500 - 100
                    </div>
                    <div class="text-center text-xs mb-1">
                        剩余pv: 50 - 10
                    </div>
                    <div class="w-1 h-10 border-l border-primary-color" />
                    <div class="w-6/12 h-10 border-t border-l border-r border-primary-color" />
                    <div class="flex w-full justify-start items-start">
                        <div class="w-6/12 flex flex-col items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                            </div>
                            <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                        </div>
                        <div class="w-6/12 flex flex-col justify-start items-center">
                            <div class="w-12 p-1 h-12 operating-button rounded-full overflow-hidden mb-2">
                                <div class="bg-black w-full h-full rounded-full overflow-hidden">
                                    <img src="../../assets/images/avtor.gif" alt="">
                                </div>
                            </div>
                            <div class="operating-button text-center text-white rounded text-xs px-3">查看</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from "../../components/ModuleTitle.vue";
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}
</style>