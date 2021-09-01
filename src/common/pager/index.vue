<template>
    <div class="pager-container">
        <div class="pager-left">
            <i class="fa fa-angle-left"></i>
        </div>
        <ul class="pager-items">
            <li v-for="(item, index) in countNum" :key="index">{{ item }}</li>
        </ul>
        <div class="pager-right">
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useCountPages } from './hooks/useCountPages'
import _ from 'lodash'
export default defineComponent({
    props: {
        // 当前页
        current: {
            type: [Number, String],
            default: ''
        },
        // 数据总数
        dataNum: {
            type: Number,
            default: 0
        },
        // 每页展示多少条数据来进行计算分页数
        PageShow: {
            type: Number,
            default: 0
        }
    },
    setup() {
        const res = ref(useCountPages(20, 9))
        const countNum = _.range(1, res.value + 1)
        console.log(countNum)
        // const pages = reactive()
        return { countNum }
    }
})
</script>

<style lang="stylus" scoped>
.pager-container {
    margin: 10px 0;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .pager-left, .pager-right {
        cursor: pointer;

        i {
            color: #000;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .pager-items {
        display: flex;
        margin: 0;
        padding: 0 15px;
        justify-content: flex-start;

        li {
            font-size: 14px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
            width: 20px;
            height: 30px;
            // border: 1px solid #000;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                transform: translateY(-6px);
                font-size: 16px;
            }
        }
    }
}
</style>