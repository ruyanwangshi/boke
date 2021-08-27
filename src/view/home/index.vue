<template>
    <div class="home-container" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }">
        <Navbar :imgUrl="imgUrl" />
        <div class="home-body">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Navbar from '@/common/navbar/index.vue'
export default defineComponent({
    components: {
        Navbar
    },
    setup() {
        let imgUrl = ref<string>(require('../../assets/image/bg2.jpg'))
        console.log(imgUrl)
        return {
            imgUrl
        }
    }
})
</script>

<style lang="stylus" scoped>
.home-container {
    min-height: 100vh;
    width: 100%;

    .home-body {
        height: 1000px;
    }
}
</style>