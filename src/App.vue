<template>
  <div class="bg-black h-screen relative">
    <div class="w-full top-0 left-0 z-40 shadow-xl sticky" v-if="route.meta.showLogo">
      <top-bar :pageTitle="pageTitle" showLogo></top-bar>
    </div>
    <div class="fixed bg-black w-full top-0 left-0 z-40 shadow-xl" v-if="route.meta.showBack">
      <top-back-bar :pageTitle="route.meta.pageTitle" />
    </div>
    <div class="fixed bg-black w-full top-0 left-0 z-40 shadow-xl" v-if="route.meta.showGOIndex">
      <top-back-home :pageTitle="route.meta.pageTitle" />
    </div>
    <div class="bg-black">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
import TopBar from '@/components/TopBar.vue'
import TopBackBar from './components/TopBackBar.vue'
import TopBackHome from './components/TopBackHome.vue'

const { proxy } = getCurrentInstance()
onMounted(() => {
  accountHasChanged()
})
async function accountHasChanged() {
  window.ethereum.on('accountsChanged', (accounts) => {
    proxy.$confirm.hide()
    proxy.$confirm.show({
      title: '賬戶發生變化',
      content: '當前賬戶發生變化，請重新登錄',
      showCancelButton: false,
      confirmText: '確定',
      onConfirm: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('address')
        location.reload()
      },
    });
  })
}
//钱包地址签名
// async function addressSign() {
//     proxy.$loading.show()
//     const web3 = new Web3(window.ethereum)
//     let params = {}
//     const randomString =
//         "Welcome to Minter\n\nPlease click to sign in and accept the Minter Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n" +
//         window.ethereum.selectedAddress +
//         "\n\nNonece:\n" +
//         generateNonce();
//     try {
//         const signature = await web3.eth.personal.sign(randomString, window.ethereum.selectedAddress, '')
//         params = { randomString: randomString, signature: signature }
//     } catch (err) {
//         proxy.$loading.hide()
//         showToast('签名失败，请重试')
//         return
//     }


//     login(params)
//         .then(res => {
//             console.log(res)
//             localStorage.setItem('token', res.access_token)
//             localStorage.setItem('address', res.address)
//             userInfo.changeAddress(res.address)
//             proxy.$loading.hide()
//             // showToast('已登录')
//         })
//         .catch(err => {
//             proxy.$loading.hide()
//             showToast('登录失败，请重试')
//             console.log(err)
//         })
//     // console.log(signature)

// }
</script>

<style  scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>