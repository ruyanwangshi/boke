<template>
    <div class="imgbg-container">
        <!-- <img :src="imgUrl" alt="" /> -->
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="stylus" scoped>
.imgbg-container {
    height: 100vh;
    width: 100%;
    background url("../../assets/image/bg.jpg") 50% center / cover no-repeat fixed rgb(255, 255, 255)
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}
</style>