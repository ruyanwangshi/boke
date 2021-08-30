<template>
    <div>{{ res }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCountPages } from './hooks/useCountPages.ts'
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
        return { res }
    }
})
</script>

<style lang="stylus" scoped></style>