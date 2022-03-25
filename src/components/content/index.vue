<template>
    <div class="md-wrapper__container markdown-body">
        <div class="md-wrapper__header">
            <div class="md-wrapper__title">{{ mdContent.filename }}</div>
            <div class="md-wrapper__createTime">{{ getTime(mdContent.createTime!) }}</div>
            <div class="md-wrapper__label-list">
                <span class="md-wrapper__label">
                    <i class="fa fa-tags"></i>
                </span>
                <span class="md-wrapper__label-item">{{ mdContent.type }}</span>
            </div>
        </div>
        <div class="md-content" v-html="mdContent.content"></div>
        <div class="backBtn" @click="backhandler" title="返回">
            <i class="fa fa-reply"></i>
        </div>
        <Catalogue :catalogueStr="mdContent.catalogueText" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getTime } from '@/util/format'
import { useInfo } from '@/store/module/useInfo'
import { storeToRefs } from 'pinia'
import loading from '@/common/loading'
import { useRouter } from 'vue-router'
import Catalogue from './components/catalogue/index.vue'

interface Content {
    filename?: string
    createTime?: string
    type?: string
    content?: string
    catalogueText?: string
}

const store = useInfo()
const router = useRouter()
const { content } = storeToRefs(store);
const mdContent = computed(() => content.value) as Content
store.setNavbarLineShow(false)

function backhandler() {
    store.setNavbarLineShow(true)
    router.back()
}
</script>

<style lang="stylus" scoped>
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 45px;
}

.md-wrapper__container {
    position: relative;

    >* {
        width: 100%;
        height: auto;
    }

    .backBtn {
        position: absolute;
        top: 0;
        left: 0;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        cursor: pointer;
    }

    .md-wrapper__header{
        border-bottom: 1px solid #808080;
    }

    .md-wrapper__title {
        text-align: center;
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .md-wrapper__createTime {
        text-align: center;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .md-wrapper__label-list {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        background: #fff;

        > span {
            border-bottom: 1px solid #fff;
        }

        .md-wrapper__label {
            margin-right: 10px;
        }

        .md-wrapper__label-item {
            width: auto;
            height: auto;
            font-size: 20px;
            color: #242424;
            transition: all 0.8s;

            &:hover {
                border-bottom: 1px solid rgba(0, 0, 0, 0.5);
            }
        }
    }
}
</style>
