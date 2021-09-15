import { computed, Prop } from 'vue'
import { CurrentObj } from '../type'

export function usePages(props: any, pageCount: number, pagerCount: number = 7) {
  return computed(() => {
    const currentPage = props.current
    const isPagerCount: boolean = (pagerCount | 0) === pagerCount && pagerCount > 4 && pagerCount < 22 && pagerCount % 2 === 1
    if (!isPagerCount) {
      throw new Error('请输入大于等于 5 且小于等于 21 的奇数')
    }
    let showPrevMore = false
    let showNextMore = false
    const halfPagerCount = (pagerCount - 1) / 2
    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - halfPagerCount) {
        showPrevMore = true
      }
      if (currentPage < pageCount - halfPagerCount) {
        showNextMore = true
      }
    }
    const array: Array<number> = []
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2)
      for (let i: number = startPage; i < pageCount; i++) {
        array.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i)
      }
    }
    return {
      showPrevMore: showPrevMore,
      showNextMore: showNextMore,
      pages: array,
    }
  })
}
