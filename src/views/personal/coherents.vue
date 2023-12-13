<template>
    <div class="flex flex-col justify-start items-center w-full bg-black pt-16 pb-20">
        <div class="w-11/12 mb-2">
            <module-title :titleWord="$t('coherents.title')" />
        </div>
        <!-- <div class="w-11/12 text-xs text-red-700 mb-5">
            {{ $t('coherents.tips') }}
        </div> -->
        <div class="w-11/12">
            <div class="mb-2" v-for="(item, index) in playerPackages" :key="index">
                <coherent-card :coherentInfo="item" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import ModuleTitle from "../../components/ModuleTitle.vue";
import CoherentCard from "../../components/CoherentCard.vue";
import coherents_list from '@/datas/coherents_list'
import { playersInfo } from '@/request/api'
const { proxy } = getCurrentInstance()
const coherentsList = ref(coherents_list)
let playerPackages = ref([])
onMounted(() => {

    getPlayersInfo(localStorage.getItem('address'))
})
//獲取玩家信息
function getPlayersInfo(address) {
    proxy.$loading.show()
    playersInfo(address)
        .then(res => {
            console.log('res', res)
            res.player.package_transactions.map(item => {
                coherentsList.value.map(_item => {
                    // let obj = {}
                    if (item.package_id == _item.id) {
                        playerPackages.value.push(_item)
                    }
                })
            })
            proxy.$loading.hide()

            console.log(playerPackages.value)
        })
        .catch(err => {
            proxy.$loading.hide()

            console.log('err', err)
        })
}
</script>

<style></style>