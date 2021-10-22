<template>
  <div class="tags-container">
    <div class="tags-search">
      <input type="text" placeholder="请输入要搜索的标签。。。" v-model="searchText" />
      <i class="fa fa-hashtag"></i>
    </div>
    <!-- <transition-group name="list-complete" tag="div" class="tags-list" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave"> -->
    <transition-group name="flip-list" tag="div" class="tags-list">
      <template v-if="tags.length === 0">
        <div class="tags-default__text">
          暂无标签
        </div>
      </template>
      <template v-else>
        <div class="tags-list__item" v-for="(item, index) in newTags" :key="index" :dataset="index">
          {{ item.name }}
        </div>
      </template>
    </transition-group>
    <button @click="deleteclick">删除</button>
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
        id: 1,
      },
      {
        name: '搞一下',
        id: 1,
      },
      {
        name: '预览',
        id: 1,
      },
      {
        name: '随笔',
        id: 1,
      },
      {
        name: '状况',
        id: 1,
      },
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
        id: 1,
      },
      {
        name: '搞一下',
        id: 1,
      },
      {
        name: '预览',
        id: 1,
      },
      {
        name: '随笔',
        id: 1,
      },
      {
        name: '状况',
        id: 1,
      },
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
        id: 1,
      },
      {
        name: '搞一下',
        id: 1,
      },
      {
        name: '预览',
        id: 1,
      },
      {
        name: '随笔',
        id: 1,
      },
      {
        name: '状况',
        id: 1,
      },
    ])
    // const newTags = ref(tags.value)
    const newTags = computed(() => {
      return tags.value.filter((item) => {
        if (item.name.indexOf(searchText.value) > -1) return item
      })
    })
    // watch(searchText, (value) => {
    //   if (!value) {
    //     newTags.value = tags.value
    //   }
    //   newTags.value = tags.value.filter((item) => {
    //     if (item.name.indexOf(value) > -1) return item
    //   })
    // })
    // let newarr = []


    function beforeEnter(el) {
      el.style.opacity = 0
    }
    function enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }
    function leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }

    function deleteclick() {
      newTags.value.splice(1, 1)
    }

    return {
      tags,
      searchText,
      newTags,
      deleteclick,
      beforeEnter,
      enter,
      leave,
    }
  },
})
</script>

<style lang="stylus">
.flip-list-move {
  transition: transform 0.8s ease;
}
.tags-container{
    height: auto;
    .tags-search{
        width: 100%;
        position relative
        input{
            width: 100%;
            padding: 10px 10px 10px 30px;
            box-sizing: border-box;
            border: 2px solid #D6D6D6;
            outline: none;
            border-radius: 4px;
        }
        i {
            position absolute
            top: 50%;
            left: 14px;
            transform: translateY(-50%);
            color: #D6D6D6;
            font-size: 12px;
        }
        input::placeholder{
            color: #D6D6D6;
            font-weight: bold;
        }
    }
    .tags-list{
        height:auto;
        min-height: 100px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .tags-default__text{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #808080;
            font-weight: bold;
            font-size: 14px;
        }
        .tags-list__item{
            margin-left: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #666;
            cursor pointer
        }
    }
}
</style>
