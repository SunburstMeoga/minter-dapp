<script setup>
defineProps({
    coherentInfo: {
        type: Object,
        default: () => { }
    }
})
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function notYetOpen() {
    showToast(t('toast.notYetOpen'));

    return;
}
</script>
<template>
    <div class="bg-card-content text-white rounded px-4 overflow-hidden">
        <div class="mb-2">
        </div>
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
            <div class="mb-1 text-sm text-menu-word flex justify-between items-center">
                <div>
                    {{ Number(coherentInfo.type) * 0.6 * (1 / 3) }}PMT{{ $t('coherents.releaseTime') }}: 2023-10-17 15:45:32
                </div>
            </div>
            <div class="mb-1 text-sm text-menu-word flex justify-between items-center">
                <div> {{ Number(coherentInfo.type) * 0.6 * (1 / 3) }}PMT{{ $t('coherents.secondReleaseTime') }}: 2023-10-18
                    15:45:32</div>
            </div>
            <div class="mb-6 text-sm text-menu-word flex justify-between items-center">
                <div>{{ Number(coherentInfo.type) * 0.6 * (1 / 3) }}PMT{{ $t('coherents.thirdReleaseTime') }}: 2023-10-19
                    15:45:32</div>
            </div>

            <!-- <div class="text-lg mb-2">
                <div class="text-white font-bold"> 200 MT</div>
            </div> -->

            <!-- <div @click="notYetOpen" class="operating-button rounded-full py-2  text-center text-white mb-4">{{
                $t('coherents.buy') }}</div> -->


        </div>
    </div>
</template>
<style scoped></style>