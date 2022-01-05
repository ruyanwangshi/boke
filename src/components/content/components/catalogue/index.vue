<template>
    
    <div id="catalogue-container">
        <div class="sidebar">

        </div>
        <!-- <div v-html="catalogueStr">

        </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import initSidebar from './catalogue.js'

export default defineComponent({
    props: {
        catalogueStr: {
            type: String,
            default: ''
        }
    },
    setup() {
        initMdSider()
        async function initMdSider() {
            await nextTick()
            initSidebar('.sidebar', '.md-content');
        }
        return {}
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
