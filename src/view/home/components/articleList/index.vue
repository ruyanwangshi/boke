<!-- 文章列表项 -->
<template>
  <div class="md-wrapper__item">
    <div class="md-wrapper__created">{{ getTime(articleItem.createTime) }}</div>
    <div class="md-wrapper__title">{{ articleItem.fileName }}</div>
    <div class="md-wrapper__label">
      <i class="fa fa-tags"></i>
      {{ articleItem.type }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    getTime
  } from '@/util/format'
  import {
    toRef
  } from 'vue'
  interface ArticleItem {
    createTime: string
    fileName: string
    type: string
  }

  interface Props {
    articleItem: ArticleItem | null
  }
  interface Emits {
    (e: 'clickhandler', index: number): void
  }
  const props = defineProps < Props > ()

  const articleItem = toRef(props, 'articleItem')
</script>

<style lang="stylus" scoped>
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

    >* {
      height: 100%;
    }
  }

  .md-wrapper__title {
    text-align: center;
    font-size: 16px;
    // font-weight: bold;
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
</style>