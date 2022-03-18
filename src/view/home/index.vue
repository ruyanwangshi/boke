<template>
    <div class="home-view__container" v-loading="loading">
        <div class="home-view-content">
            <div
                class="md-wrapper__item"
                v-for="(item, index) in state.MdArray"
                :key="index"
                @click="itemClick(index)"
            >
                <div class="md-wrapper__created">{{ getTime(item.createTime) }}</div>
                <div class="md-wrapper__title">{{ item.filename }}</div>
                <div class="md-wrapper__label">
                    <i class="fa fa-tags"></i>
                    {{ item.type }}
                </div>
            </div>
        </div>
        <pager
            :current="state.current"
            :total="total"
            :PageShow="pageSize"
            @pagerClick="pagerClickHandler"
        />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useInfo } from '@/store/module/useInfo'
import { useRouter } from 'vue-router'
import { RequestInstance } from '@/request/request'
import { useMdTransform } from '@/hooks/useMdTransform'
import { StateType } from './type'
import pager from '@/common/pager'
import { getTime } from '@/util/format'


const router = useRouter()
const store = useInfo()
const total = ref(0)
const pageSize = ref(10)
const loading = ref(true)

const state = reactive<StateType>({
    MdArray: [],
    current: 1,
    total: 0
})

try {
    // 初始化首页md数据
    initPageData(state.current)
    console.log('total=>', total.value)
} catch (e) {
    console.log(e)
}

async function initPageData(page) {
    const params = {
        current: page,
        pageSize: pageSize.value
    }
    loading.value = true
    const { data } = await RequestInstance('get', '/md', params)
    const MdArray = useMdTransform(data.result.data, true)
    total.value = data.result.pageSizeInfo.total
    state.MdArray = MdArray
    loading.value = false
}

// 分页器点击事件
function pagerClickHandler(obj: { currentIndex: number }) {
    state.current = obj.currentIndex
    initPageData(state.current)
}

function itemClick(index) {
    const MDContent = state.MdArray[index]
    store.setContent(MDContent)
    router.push({
        path: '/content'
    })
}
</script>

<style lang="stylus" scoped>
.home-view__container {
    background: #fff;
    overflow: hidden;

    .active_style {
        max-height: 400px;
        height: 400px;
        position: relative;
        overflow: hidden;

        &:before {
            content: '';
            position: absolute;
            height: 30px;
            bottom: 0;
            right: 0;
            width: 100%;
            background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1));
        }
    }

    .home-view-content {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
    }

    .md-wrapper__item {
        width: 50%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.4);
        box-shadow: 10px 10px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 46%;
        margin: 0 2% 20px;
        border-radius: 10px;
        font-family: fangsong;

        > * {
            height: 100%;
        }
    }

    .md-wrapper__title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    .md-wrapper__label {
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;

        .label-item {
            cursor: pointer;
            vertical-align: middle;
            user-select: none;

            &:before {
                content: '#';
                visibility: hidden;
                margin-right: 4px;
            }

            &:hover:before {
                color: red;
                visibility: visible;
            }
        }
    }

    .md-wrapper__movebtn {
        margin: 25px auto 0;
        width: 45px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        color: #fff;
        box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.4);
    }
}
</style>
