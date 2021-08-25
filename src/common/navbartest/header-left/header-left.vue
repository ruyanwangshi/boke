<template>
    <div class="header-left">
        <div class="header-img">
            <img src="../../../assets/image/header.jpg" alt="头像" />
        </div>
        <div class="header-left-body">
            <div class="header-left-link">css特效组件练习</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    setup(props: any, context: any) {
        const { headerImg, setHeaderImg } = haderImgConfig(props, context)
    }
})

function haderImgConfig(props: any, ctx: any) {
    console.log(props)
    console.log(ctx)
    const headerImg = reactive({})
    const setHeaderImg = (imgObj: any) => {
        console.log(headerImg)
        console.log(imgObj)
    }
    return {
        headerImg,
        setHeaderImg
    }
}
</script>

<style lang="stylus" scoped>
.header-left {
    padding: 1rem 1rem;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    background: white;

    .header-img {
        margin: 0 auto;
        overflow: hidden;
        // border-top: 0.1rem solid rgba(0, 0, 0, 0.4);
        // border-left: 0.1rem solid rgba(0, 0, 0, 0.4);
        // border-right: 0.1rem solid rgba(0, 0, 0, 0.4);
        // border-bottom: 0.1rem solid rgba(0, 0, 0, 0.4);
        box-shadow 0 1px 10px 1px inset rgba(0,0,0,0.4)
        border-radius: 1rem;
        padding: 1rem 0;
        text-align: center;

        img {
            height: 6rem;
            width: 6rem;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
            border-radius: 50%;
        }
    }

    .header-left-body {
        .header-left-link {
            height: 2rem;
        }
    }
}
</style>
