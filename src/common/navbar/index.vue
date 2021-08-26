<template>
    <div class="navbar-container">
        <!-- 导航栏 -->
        <ul class="navbar-items">
            <li class="navbar-item__style" v-for="(item, index) in navbarItmes" :ref="setNavbarEl" :key="index" @click="itemClick(index)">
                <i :class="item.icon"></i>
                {{ item.title }}
            </li>
        </ul>
        <div :style="{ left: 0, width: 0 }" class="navbar-line"></div>
        <!-- 导航栏高斯模糊背景 -->
        <div class="navbar-blur" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, ref } from 'vue'
import { navbarItmes } from './contant'
import { getHtmlElment, initItemBg } from './hooks/useAnimateClick'
export default defineComponent({
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    },
    setup() {
        let click:() => void
        onMounted(() => {
            initItemBg()
        })
        const vm = getCurrentInstance()
        const currindex = ref<number>(0)
        const { navbarEl, setNavbarEl } = getHtmlElment()

        function itemClick(index: number) {
            currindex.value = index
            console.log(navbarEl[currindex.value])
        }

        return {
            setNavbarEl,
            navbarItmes,
            itemClick
        }
    }
})
</script>

<style lang="stylus">
.navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 40px;
    background-color: white;
    z-index: 1;
    background-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    overflow: hidden;

    .navbar-items {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;

        .navbar-item__style {
            width: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            filter: contrast(20%);
            opacity: 0.8;
            transition: all 0.3s;

            i {
                margin-right: 6px;
            }

            &:hover {
                filter: contrast(100%);
                opacity: 1;
            }
        }
    }

    .navbar-line {
        position: absolute;
        bottom: 0;
        background: red;
    }

    .navbar-blur {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        inset: 0px;
        z-index: -1;
        filter: blur(50px);
        width: 100%;
    }
}
</style>
