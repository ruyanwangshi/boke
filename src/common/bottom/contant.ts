import { reactive } from 'vue'

export type IconList = {
  title: string
  icon: string
  linkUrl: string
}

const iconStyle = 'fa '

export const iconList: IconList[] = reactive<IconList[]>([
  {
    title: 'github',
    icon: `${iconStyle}fa-github-alt`,
    linkUrl: ''
  }
])
