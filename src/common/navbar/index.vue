<template>
    <div class="navbar-container">
        <!-- 导航栏 -->
        <ul class="navbar-items">
            <li class="navbar-item__style" :class="{ 'font-style': currindex === index }" v-for="(item, index) in navbarItmes" :ref="getHtmlElment" :key="index" @click="itemClick(index)">
                <i :class="item.icon"></i>
                {{ item.title }}
            </li>
        </ul>
        <div :style="{ left: `${lineStyle.left}px`, width: `${lineStyle.width}px` }" class="navbar-line"></div>
        <!-- 导航栏高斯模糊背景 -->
        <div class="navbar-blur" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, nextTick } from 'vue'
import { navbarItmes } from './contant'
import { getHtmlElment, itemTranslation, currindex, lineStyle } from './hooks/useAnimateClick'
export default defineComponent({
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    },
    setup(val, val2) {
        onMounted(async () => {
            await nextTick()
            itemTranslation()
        })
        console.log(val)
        console.log(val2)
        const vm = getCurrentInstance()

        function itemClick(index: number) {
            currindex.value = index
            itemTranslation()
        }

        return {
            lineStyle,
            getHtmlElment,
            navbarItmes,
            itemClick,
            currindex
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
            width: 80px;
            margin: 0 10px;
            white-space: nowrap;
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

        .font-style {
            color: #303133;
            filter: contrast(100%);
            opacity: 1;
        }
    }

    .navbar-line {
        position: absolute;
        height: 2px;
        transition: all 0.3s;
        bottom: 0;
        background: #303133;
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
