<template>
  <div class="describe-container">
    <div class="describe-content">
      <div class="describe-title">关于我</div>
      <ol>
        <li>内容1</li>
        <li>内容2</li>
        <li>内容3</li>
        <li>内容4</li>
      </ol>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="stylus" scoped>
.describe-container{
  width: 100%;
  height: auto;
  
  .describe-content{
    height: auto;
    width: 100%;

    .describe-title{
      height: auto;
      font-size: 26px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px; 
    }


  }
}
</style>
