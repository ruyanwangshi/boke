<template>
  <div class="navbar-container">
    <div class="navbar-items"></div>
    <div class="navbar-blur"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="stylus">
.navbar-container {
    width: 100%;
    height: 60px;
    // filter: blur(50px);
    background-color: white;
    position: relative;
    z-index: 1;
    background-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    overflow: hidden;

    .navbar-items {
        width 100 height 100
    }

    .navbar-blur {
        position: absolute;
        height 100%
        inset: 0px;
        z-index: -1;
        content: "";
        filter: blur(50px);
        background url("../../assets/image/bg.jpg") 50% center / cover no-repeat fixed rgb(255, 255, 255);
        width: 100%;
    }
}
</style>
