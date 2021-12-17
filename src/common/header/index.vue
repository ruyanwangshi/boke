<template>
  <div class="header-container">
    <div class="header-img">
      <img :src="headerInfo.headerImg" alt="" />
    </div>
    <div class="header-name">{{ headerInfo.name }}</div>
    <div class="header-describe">{{ headerInfo.describe }}</div>
    <div class="header-blur" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { HeaderInfo } from './type'
export default defineComponent({
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    headerInfo: {
      type: Object as PropType<HeaderInfo>,
      default() {
        return {}
      },
    },
  },
})
</script>

<style lang="stylus" scoped>
.header-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 180px;
    background: rgba(255, 255, 255, 1);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    // overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header-img {
        position absolute
        top -35%
        left 50%
        transform: translateX(-50%);
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
        border: 4px solid rgba(0, 0, 0, 0.3);
        box-sizing: border-box;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    .header-name {
        margin-top: 80px;
        text-align: center;
        color: #fff;
        font-size: 24px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        font-family: fantasy;
    }

    .header-describe {
        text-align: center;
        color: #fff;
        font-size: 14px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        font-weight: 600;
    }

    // background: transparentify;
    .header-blur {
        position: absolute;
        // top: 0;
        inset: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        filter: blur(20px);
    }
}
</style>
