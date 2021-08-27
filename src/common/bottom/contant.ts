import { reactive } from 'vue'

type IconList = {
  title: string
  icon: string
  linkUrl: string
}

export const iconList: IconList[] = reactive<IconList[]>([])
