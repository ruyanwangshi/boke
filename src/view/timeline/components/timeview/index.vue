<template>
  <div class="timeview-container">
    <div class="timeview-container__title">
      <i class="fa fa-clock-o"></i>{{}}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
  .timeview-container__title{
    font-size: 30px;
  }
</style>
