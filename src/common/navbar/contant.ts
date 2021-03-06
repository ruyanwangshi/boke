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
  {
    title: 'Classification',
    icon: `${iconStyleFont}fa-th-list`,
    linkUrl: '/classification',
  },
  {
    title: 'Tags',
    icon: `${iconStyleFont}fa-hashtag`,
    linkUrl: '/tags',
  },
  {
    title: 'Describe',
    icon: `${iconStyleFont}fa-hashtag`,
    linkUrl: '/describe'
  },
  {
    title: 'Youlian',
    icon: `${iconStyleFont}fa-link`,
    linkUrl: '/youlian'
  },
])
