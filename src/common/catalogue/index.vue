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
    watch,
    computed
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

const styleWidth = computed(() => `${width.value}px`)
const styleLeftValue = computed(() => `${leftValue.value}px`)

let timerId: NodeJS.Timer
let containerEl: HTMLElement | null

watch(route, () => {
    if (timerId) clearTimeout(timerId)
    if (route.path === '/content') {
        initMdSider()
        window.addEventListener('resize', onResize)
    } else {
        showSider.value = false
        timerId = setTimeout(() => {
            deleteMdSider()
            window.removeEventListener('resize', onResize)
        }, 500)
    }
})

async function initMdSider() {
    await nextTick()
    width.value = 400
    leftValue.value = 60
    containerEl = document.querySelector('.base-body')
    width.value = +containerEl!.offsetLeft - +leftValue.value - 50
    leftValue.value = leftValue.value
    showSider.value = initSidebar('.sidebar', '.md-content')
}

function onResize() {
    const elWidth = containerEl!.offsetLeft - parseInt(leftValue.value as string) - 50
    if (elWidth <= 0) {
        showSider.value = false
        return
    } else {
        showSider.value = true
    }
    if (width.value < 170) {
        if (elWidth <= 95 && leftValue.value > 0) {
            (leftValue.value as number)--
        } else if (elWidth > 95 && elWidth < 400) {
            (leftValue.value as number)++
        }
    } else {
        (width.value as number)--
    }

    console.log(elWidth)
    // width.value = `${+containerEl!.offsetLeft - +leftValue.value - 50}px`
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
        width: v-bind(styleWidth);
        padding: 20px;
        position: fixed;
        top: 200px;
        left: v-bind(styleLeftValue);
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