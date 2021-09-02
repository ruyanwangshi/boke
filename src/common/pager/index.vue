<template>
    <div class="pager-container">
        <div class="pager-left" @click="leftClick">
            <i class="fa fa-angle-left" :class="{ 'page-items__threshold': current === 1 }"></i>
        </div>
        <ul class="pager-items">
            <li v-for="(item, index) in pagers" :class="{ 'pager-active': current === item }" :key="index" @click="itemClick(item)">
                <!-- <div class="">
                    <i class="fa fa-ellipsis-h"></i>
                </div> -->
                <div class="pager-item__style" :class="{}">
                    <template v-if="item + 1 === separateValues">
                        <i class="fa fa-ellipsis-h"></i>
                    </template>
                    <template v-else>
                        {{ item }}
                    </template>
                </div>
            </li>
        </ul>
        <div class="pager-right" @click="rightClick">
            <i class="fa fa-angle-right" :class="{ 'page-items__threshold': current === pageSize }"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useCountPages } from './hooks/useCountPages'
import { CurrentObj } from './type'
export { CurrentObj }
import _ from 'lodash'
export default defineComponent({
    props: {
        // 当前页
        current: {
            type: Number,
            default: 1
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
        },
        // 分割值
        separateValues: {
            type: Number,
            default: 5
        },
        start: {
            type: Number,
            default: 10
        }
    },
    setup(props, context) {
        const { emit } = context
        const pageSize = ref(useCountPages(20, 1))
        // const pagerCount = pageSize
        const separateValues = ref(props.separateValues)
        const pagerOption = reactive<CurrentObj>({ currentIndex: props.current, dataNum: props.dataNum, PageShow: props.PageShow })

        const pagers = computed(() => {
            // const array:number[] = []
            // const offset = Math.floor(pageSize.value / 2) - 1
            // const offset = Math.floor(pageSize.value / 2) - 1
            // console.log(offset)

            // for (let i:number = props.current - offset; i <= props.current + offset; i++) {
            //     array.push(i)
            // }
            const countNum = _.range(1, pageSize.value + 1)
            return countNum.slice(props.current - 1, props.current + props.separateValues - 1).length !< props.separateValues
        })
        function itemClick(currentIndex: number) {
            pagerOption.currentIndex = currentIndex
            console.log(currentIndex)
            console.log(pagers.value)
            emit('pagerClick', pagerOption)
        }

        function leftClick() {
            if (pagerOption.currentIndex > 1) {
                pagerOption.currentIndex -= 1
            }
            if (pageSize > separateValues) {
            }
            emit('pagerClick', pagerOption)
        }
        function rightClick() {
            if (pagerOption.currentIndex < pageSize.value) {
                pagerOption.currentIndex += 1
            }
            // if(pageSize > separateValues) {
            //     countNum.unshift
            // }
            emit('pagerClick', pagerOption)
        }
        // const pages = reactive()
        return { pagers, itemClick, leftClick, rightClick, pageSize, separateValues }
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

    // overflow: hidden;
    .pager-left, .pager-right {
        cursor: pointer;

        i {
            color: #000;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .page-items__threshold {
        color: rgba(0, 0, 0, 0.2) !important;
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
            width: 20px;
            height: 30px;
            transition: all 0.2s;

            // border: 1px solid #000;
            .pager-item__style {
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.2s;
                height: 100%;
                width: 100%;

                &:hover {
                    transform: translateY(-6px);
                    font-size: 16px;
                }
            }
        }

        .pager-active {
            color: rgba(255, 255, 255, 0.6);
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
            text-shadow: 0 0 10px rgba(255, 255, 255, 1);
            border-radius: 2px;

            .pager-item__style {
                transition: all 0s;

                &:hover {
                    transform: translateY(0);
                    font-size: 14px;
                }
            }
        }
    }
}
</style>