<template>
    <div class="catalogue-container">
        <div v-html="catalogueStr">

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    props: {
        catalogueStr: {
            type: String,
            default: ''
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="stylus" scoped>
.catalogue-container{
    width: 400px;
    padding: 20px;
    position fixed
    top 200px;
    left 60px
    background: #fff
}
</style>
