<template>
    <div class="navbar-container" ref="navbar">
        <div class="menu-left">
            <div class="menu-btn fa fa-reorder" @click="menuclick"></div>
            <span>vue3练习</span>
        </div>
        <div class="menu-right menu-btn" @click="inputshow">
            <input type="text" class="menu-container font" ref="navbarSearch" />
            <!-- <i class="fa fa-search"></i> -->
        </div>
    </div>
    <menulist @bg-click="bgclick" :isShow="isShow">
        <headerLeftList />
    </menulist>
    <!-- <search :searchShow="searchShow" @searchClose="searchClose" /> -->
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent, PropType, defineAsyncComponent, ref, onMounted, getCurrentInstance, nextTick, watch, Component } from 'vue'
import gsap from 'gsap'
import menulist from '../menulist/menulist.vue'
import search from '../search/search.vue'
import { headerLeftList } from './header-left'

const watchElement = function watchElement(searchShow: any, vm: any) {
    watch(
        searchShow,
        (val) => {
            console.log('是否点击搜索')
            if (val) {
                // await nextTick()
                gsap.to(vm.refs.navbarSearch, 0.2, {
                    width: '20rem',
                    boxShadow: 'inset 0 1px 2px 1px rgba(0, 0, 0, 0.3)'
                })
            } else {
                // await nextTick()
                gsap.to(vm.refs.navbarSearch, 0.2, {
                    width: '10rem',
                    boxShadow: 'inset 0 1px 2px 1px rgba(0, 0, 0, 0.3)'
                })
            }
        },
        {
            // immediate: true
        }
    )
}

export default defineComponent({
    components: {
        menulist,
        search,
        // headerLeftList:defineAsyncComponent(()=>import('./header-left'))
        headerLeftList
    },
    setup() {
        const vm: any = getCurrentInstance()
        onMounted(() => {
            window.addEventListener('scroll', scroll)
        })

        const isShow = ref(false)
        const searchShow = ref(false)

        watchElement(searchShow, vm)

        const menuclick = () => {
            isShow.value = !isShow.value
        }
        const bgclick = () => {
            isShow.value = !isShow.value
        }
        const setinputval = () => {
            console.log('回车')
        }
        const inputshow = () => {
            searchShow.value = !searchShow.value
        }
        const searchClose = () => {
            searchShow.value = !searchShow.value
        }
        const scroll = async (el: any) => {
            const homeContainer: any = document.querySelector('#home-container')
            if (window.pageYOffset > 10) {
                await nextTick()
                vm.refs.navbar.style.position = 'fixed'
                homeContainer.style.paddingTop = vm.refs.navbar.offsetHeight + 'px'
                // gsap.to(vm.refs.navbar, 1, {
                //   background: "rgba(255,255,255,.4)",
                // });
            } else {
                await nextTick()
                vm.refs.navbar.style.position = 'relative'
                homeContainer.style.paddingTop = 0
                // gsap.to(vm.refs.navbar, 1, {
                //   background: "rgba(255,255,255,1)",
                // });
            }
        }
        return {
            isShow,
            searchShow,
            menuclick,
            bgclick,
            setinputval,
            inputshow,
            searchClose
        }
    }
})
</script>
<style lang="stylus">
.navbar-container {
    padding: 0.9rem 1rem;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    z-index: 10;

    .menu-container {
        width: 10rem;
        height: 2rem;
        box-shadow: inset 0 1px 2px 1px rgba(0, 0, 0, 0.3);
        border-radius: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1rem;
        box-sizing: border-box;

        &::before {
            content: '\f002';
            display: inline-block;
            font: normal normal normal 14px / 1 FontAwesome;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            cursor: pointer;
            font-size: 1rem;
        }
    }

    .font {
        display: inline-block;
        font: normal normal normal 14px / 1 FontAwesome;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        cursor: pointer;
    }

    .menu-btn {
        cursor: pointer;
        font-size: 1.6rem;
        padding-right: 1rem;
    }

    .menu-left {
        span {
            font-size: 2rem;
            margin-left: 1rem;
        }
    }

    .menu-left, .menu-right {
        flex: 1;
        display: flex;
        align-items: center;
    }

    .menu-right {
        justify-content: flex-end;
        text-align: right;
    }
}
</style>
