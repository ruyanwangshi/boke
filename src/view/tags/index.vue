<template>
  <div class="tags-container">
    <div class="tags-search">
      <input type="text" placeholder="请输入要搜索的标签。。。" v-model="searchText" />
      <i class="fa fa-hashtag"></i>
    </div>
    <transition-group name="tags" tag="div" class="tags-list">
      <template v-if="tags.length === 0">
        <div class="tags-default__text">
          暂无标签
        </div>
      </template>
      <template v-else>
        <a class="tags-list__item" v-for="item in newTags" :key="item.id">
          {{ item.name }}
        </a>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import gsap from 'gsap'

export default defineComponent({
  setup() {
    const searchText = ref('')
    const tags = ref([
      {
        name: '随笔',
        id: 1,
      },
      {
        name: '测试',
        id: 2,
      },
      {
        name: '试试',
        id: 3,
      },
      {
        name: '搞一下',
        id: 4,
      },
      {
        name: '预览',
        id: 5,
      },
      {
        name: '时',
        id: 6,
      },
      {
        name: '状况',
        id: 7,
      },
      {
        name: '测试',
        id: 8,
      },
      {
        name: '测试',
        id: 9,
      },
      {
        name: '试试',
        id: 10,
      },
      {
        name: '搞一下',
        id: 11,
      },
      {
        name: '预览',
        id: 12,
      },
      {
        name: '随笔',
        id: 13,
      },
      {
        name: '状况',
        id: 14,
      },
      {
        name: '试一试',
        id: 15,
      },
      {
        name: '测试',
        id: 16,
      },
      {
        name: '怎样',
        id: 17,
      },
      {
        name: '搞一下',
        id: 18,
      },
      {
        name: '预览',
        id: 19,
      },
      {
        name: '随笔',
        id: 20,
      },
      {
        name: '状况',
        id: 21,
      },
    ])
    const newTags = computed(() => {
      return tags.value.filter((item) => {
        if (item.name.indexOf(searchText.value) > -1) return item
      })
    })

    function deleteclick() {
      tags.value.splice(1, 1)
    }

    return {
      tags,
      searchText,
      newTags,
      deleteclick,
    }
  },
})
</script>

<style lang="stylus">
.tags-leave-active,
.tags-leave-to {
  opacity: 0;
  position: absolute;
}
.tags-leave-active,
.tags-enter-from {
  transform: translateY(0)
  opacity: 0;
}

.tags-container {
  height: auto;

  .tags-search {
    width: 100%;
    position: relative;
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 10px 10px 10px 30px;
      box-sizing: border-box;
      border: 2px solid #D6D6D6;
      outline: none;
      border-radius: 4px;
    }

    i {
      position absolute;
      top: 50%;
      left: 14px;
      transform: translateY(-50%);
      color: #D6D6D6;
      font-size: 12px;
    }

    input::placeholder {
      color: #D6D6D6;
      font-weight: bold;
    }
  }

  .tags-list {
    display: flex;
    flex-flow: row wrap;
    padding: 0 40px 80px;
    // justify-content: center;

    >* {
      margin-right: 0.8rem;
      margin-bottom: 1rem;
    }

    >*:last-child {
      margin-right: 0;
    }

    .tags-default__text {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #808080;
      font-weight: bold;
      font-size: 14px;
    }

    .tags-list__item {
      // margin-left: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #666;
      cursor: pointer;
      // display: flex;
      // align-items: center;
      transition: all 225ms;
      &:hover{
       transform: scale(1.1)
      }
    }
  }
}
</style>
