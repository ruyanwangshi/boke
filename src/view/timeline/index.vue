<template>
  <div class="tiemline-container">
    <tiemview />
    <tiemview />
    <tiemview />
    <tiemview />
    <tiemview />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import tiemview from './components/timeview/index.vue'
export default defineComponent({
  components: { tiemview },
  setup() {
    const vm = getCurrentInstance()
    return {}
  },
})
</script>

<style lang="stylus">
.tiemline-container{
  background #fff
}
</style>
