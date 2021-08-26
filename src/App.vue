<template>
    <!-- <div>
        <Navbar />
        <suspense>
            <component :is="Page" />
        </suspense>
    </div> -->
    <router-view />
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
// import { useNavbarChange } from '../../hooks/Apphooks'
import { useNavbarChange } from '@/hooks/Apphooks'
export default defineComponent({
    setup(props, context) {
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
