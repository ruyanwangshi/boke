<template>
    <div class="bottom-container">
        <ul class="icon_list">
            <li v-for="(item, index) in iconList" :key="index"></li>
        </ul>
        <div class="bottom-blur" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { iconList } from './contant'
export default defineComponent({
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    },
    setup() {
        return {
            iconList
        }
    }
})
</script>

<style lang="stylus" scoped>
.bottom-container {
    width: 100%;
    height: 160px;
    background: rgba(255, 255, 255, 1);
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    .bottom-blur {
        position: absolute;
        top: 0;
        // inset: 0px;
        z-index: -1;
        // content: '';
        filter: blur(30px);
        height: 100%;
        width: 100%;
    }
}
</style>