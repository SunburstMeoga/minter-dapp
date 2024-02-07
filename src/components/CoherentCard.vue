<script setup>
defineProps({
    coherentInfo: {
        type: Object,
        default: () => { }
    },
    showReVote: {
        type: Boolean,
        default: false
    }
})
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n'
import { FilterTime } from '@/utils/format'

const { t } = useI18n()

function notYetOpen() {
    showToast(t('toast.notYetOpen'));

    return;
}

function FilterTimeNext(value, time) {
    var timestamp = new Date(value).getTime()
    let date = new Date(parseInt(timestamp + time * 1000))
    // //console.log(timestamp, time, timestamp + )
    let Year = date.getFullYear()
    let Moth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let Hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let Minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let Sechond = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    let GMT = Year + '-' + Moth + '-' + Day + '   ' + Hour + ':' + Minute + ':' + Sechond

    return GMT
}
</script>
<template>
    <div class="border-card-content border text-white rounded px-4 py-2 overflow-hidden flex justify-between items-center">

        <div>
            <div class="mb-1 font-bold text-xl">
                {{ coherentInfo.name }}
            </div>
            <div class="mb-1 text-sm text-menu-word">
                {{ $t('coherents.coherentCap') }}:{{ coherentInfo.limit }}
            </div>
            <div class="mb-1 text-sm text-menu-word">
                {{ $t('coherents.MatchingLevelBonusRate') }}:{{ coherentInfo.incentiveRate * 100 + '%' }}
            </div>

            <!-- <div class="mb-1 text-sm text-menu-word">
                {{ $t('coherents.bonusLevel') }}: {{ $t('coherents.level') }}
            </div> -->
            <!-- <div class="mb-1 text-sm text-menu-word flex justify-between items-center">
                <div>
                    {{ Number(coherentInfo.type) * 0.6 * (1 / 3) }}PMT{{ $t('coherents.releaseTime') }}: {{
                        FilterTime(coherentInfo.created_at) }}
                </div>
            </div>
            <div class="mb-1 text-sm text-menu-word flex justify-between items-center">
                <div> {{ Number(coherentInfo.type) * 0.6 * (1 / 3) }}PMT{{ $t('coherents.secondReleaseTime') }}: {{
                    FilterTimeNext(coherentInfo.created_at, 86400) }}</div>
            </div>
            <div class="mb-6 text-sm text-menu-word flex justify-between items-center">
                <div>{{ Number(coherentInfo.type) * 0.6 * (1 / 3) }}PMT{{ $t('coherents.thirdReleaseTime') }}: {{
                    FilterTimeNext(coherentInfo.created_at, 172800) }}</div>
            </div> -->

            <!-- <div class="text-lg mb-2">
                <div class="text-white font-bold"> 200 MT</div>
            </div> -->

            <!-- <div @click="notYetOpen" class="operating-button rounded-full py-2  text-center text-white mb-4">{{
                $t('coherents.buy') }}</div> -->


        </div>
        <!-- <div class="operating-button px-8 py-1 rounded-full text-white text-sm" v-show="showReVote"
            @click="$emit('toReVote')">復投
        </div> -->
    </div>
</template>
<style scoped></style>