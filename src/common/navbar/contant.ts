import { ref } from 'vue'

import { NavbarItme } from './type'

export const navbarItmes = ref<Array<NavbarItme>>([
  {
    title: 'Home',
    icon: 'fa fa-home',
    linkUrl: '/home',
  },
  {
    title: 'TimeLine',
    icon: 'fa fa-calendar',
    linkUrl: '/timeline',
  },
])
