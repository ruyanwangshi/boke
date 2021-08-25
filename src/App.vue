<template>
    <div>
        <Navbar />
        <!-- ?? 为什么不能声明异步声明成异步又会产生什么？ -->
        <suspense>
            <component :is="Page" />
        </suspense>
    </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent } from 'vue'
import Navbar from './common/navbar/navbar.vue'
import home from './components/home/home.vue'
import { useNavbarChange } from '@/hooks/Apphooks'
export default defineComponent({
    components: {
        Navbar,
        home
    },
    setup(props: any, context: any): Object {
        const [Page, setPage] = useNavbarChange(props, context)
        return {
            Page,
            setPage
        }
    }
})

</script>

<style>
@import './assets/css/base.css';
</style>
