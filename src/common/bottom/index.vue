<template>
    <div class="bottom-container">
        <ul class="icon_list">
            <li v-for="(item, index) in iconList" :key="index" class="icon_list--item" @click="linkClick(item)">
                <i :class="item.icon" :title="item.title"></i>
            </li>
        </ul>
        <div class="height"></div>
        <div class="bottom-blur" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { iconList, IconList } from './contant'
export default defineComponent({
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    },
    setup() {
        function linkClick(item: IconList) {
            console.log(item)
        }

        return {
            iconList,
            linkClick
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
    padding: 10px;
    box-sizing: border-box;

    .icon_list {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon_list--item {
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            font-size: 16px;

            &:hover {
                transform: scale(1.4);
                // font-size: 20px;
                color: red;
            }
        }
    }

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