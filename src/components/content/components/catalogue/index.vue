<template>
    <div id="catalogue-container">
        <!-- <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @afterEnter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
        > -->
            <div class="sidebar">
                <!-- <initSidebar contentRef='.md-content'/> -->
            </div>
        <!-- </transition> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onActivated, onDeactivated } from 'vue'
// import initSidebar from './catalogue'
import initTransitionMethods from '../../hooks/transitionMethods'
import initSidebar from './catalogue.js'

export default defineComponent({
    props: {
        catalogueStr: {
            type: String,
            default: ''
        }
    },
    setup() {
        const showSider = ref(false)
        onActivated(() => {
            initMdSider()
        })

        console.log(456)

        onDeactivated(() => {
            deleteMdSider()
        })

        async function initMdSider() {
            await nextTick()
            initSidebar('.sidebar', '.md-content');
        }

        async function deleteMdSider() {
            const sider = document.querySelector('.sidebar');
            sider!.innerHTML = '';
        }

        return {
            ...initTransitionMethods()
        }
    }
})
</script>

<style lang="stylus" scoped>
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
