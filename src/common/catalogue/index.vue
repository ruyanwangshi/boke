<template>
    <div>
        <transition name="fade" appear mode="out-in">
            <div id="catalogue-container" v-show="showSider">
                <div class="sidebar"></div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import {
    ref,
    nextTick,
    watch
} from 'vue'

import { useRoute } from 'vue-router'

import {
    initSidebar
} from './catalogue'

import "./index.stylus"

const route = useRoute()
const showSider = ref(false)
const width = ref<number | string>(0)
const leftValue = ref<number | string>(0)

watch(route, () => {
    console.log('执行了', route)
    if (route.path === '/content') {
        initMdSider()
    } else {
        showSider.value = false
        setTimeout(() => {
            deleteMdSider()
        }, 500)
    }
})

async function initMdSider() {
    await nextTick()
    width.value = 400
    leftValue.value = 60
    const containerEl: HTMLElement | null = document.querySelector('.base-body')
    width.value = `${+containerEl!.offsetLeft - +leftValue.value - 50}px`
    leftValue.value = `${leftValue.value}px`
    showSider.value = initSidebar('.sidebar', '.md-content')
}

async function deleteMdSider() {
    const sider = document.querySelector('.sidebar')
    sider!.innerHTML = ''
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    z-index: -100;
}
</style>
<style lang="stylus" scoped>
    #catalogue-container {
        width: v-bind(width);
        padding: 20px;
        position: fixed;
        top: 200px;
        left: v-bind(leftValue);
        background: #fff;
        border-radius: 8px;
        background: rgba(255, 255, 255, .8);
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, .6);

        .catalogue-title{
            padding-bottom 10px
            vertical-align: middle;
        }
    }
</style>