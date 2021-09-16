<template>
  <div class="base-container" :style="{ background: `url(${imgUrl}) 50% center / cover no-repeat fixed rgb(255, 255, 255)` }">
    <Navbar :imgUrl="imgUrl" />
    <div class="base-body">
      <Header :headerInfo="headerInfo" :imgUrl="imgUrl" />
      <suspense>
        <router-view />
      </suspense>
      <Bottom :imgUrl="imgUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Navbar from '@/common/navbar/index.vue'
import Header from '@/common/header/index.vue'
import Bottom from '@/common/bottom/index.vue'
export default defineComponent({
  components: {
    Navbar,
    Header,
    Bottom,
  },
  setup() {
    const imgUrl = ref<string>(require('./assets/image/bg2.jpg'))
    const headerInfo = reactive({
      headerImg: require('./assets/image/header.jpg'),
      name: 'differ',
      describe: '严于律已 宽以待人',
    })
    console.log(imgUrl)
    return {
      imgUrl,
      headerInfo,
    }
  },
})
// import { defineComponent, } from 'vue'
// // import { useNavbarChange } from '../../hooks/Apphooks'
// import { useNavbarChange } from '@/hooks/Apphooks'
// export default defineComponent({
//     setup(props, context) {
//         const [Page, setPage] = useNavbarChange(props, context)
//         return {
//             Page,
//             setPage
//         }
//     }
// })
</script>
<style>
@import './assets/css/base.css';
</style>
<style lang="stylus" scoped>
.base-container {
    min-height: 100vh;
    width: 100%;

    .base-body {
        padding: 140px 0;
        min-width: 800px;
        width: 800px;
        margin: 0 auto;
        // height: 1000px;
    }
}
</style>
