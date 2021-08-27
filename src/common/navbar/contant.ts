import { ref } from 'vue'

import { NavbarItme } from './type'

const iconStyleFont = 'fa '

export const navbarItmes = ref<Array<NavbarItme>>([
  {
    title: 'Home',
    icon: `${iconStyleFont}fa-home`,
    linkUrl: '/home',
  },
  {
    title: 'TimeLine',
    icon: `${iconStyleFont}fa-calendar`,
    linkUrl: '/timeline',
  },
])
