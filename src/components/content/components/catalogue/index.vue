<template>
    <transition name="fade">
        <div id="catalogue-container" v-show="showSider">
            <div class="sidebar">
                <!-- <initSidebar contentRef='.md-content'/> -->
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { defineComponent, ref, nextTick, onActivated, onDeactivated } from 'vue'
// import initSidebar from './catalogue'
import initTransitionMethods from '../../hooks/transitionMethods'
import { initSidebar } from './catalogue'
const showSider = ref(false)
onActivated(() => {
    initMdSider()
})
onDeactivated(() => {
    deleteMdSider()
})

async function initMdSider() {
    await nextTick()
    showSider.value = initSidebar('.sidebar', '.md-content');
}

async function deleteMdSider() {
    const sider = document.querySelector('.sidebar');
    sider!.innerHTML = '';
}
</script>

<style lang="stylus" scoped>
@import url(./index.stylus);
#catalogue-container{
    width: 400px;
    padding: 20px;
    position fixed
    top 200px;
    left 60px
    background: #fff
    border-radius: 8px;
    background: rgba(255,255,255,.8)
    box-shadow: 0 0 10px 1px rgba(0,0,0,.6)
}
</style>
