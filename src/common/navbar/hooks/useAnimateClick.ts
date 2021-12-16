import { nextTick, reactive } from 'vue'

interface ElementSize {
  [key: string]: string
}
interface LineStyle {
  [key: string]: number | string
}
type CloseFn = () => void

const navbarEl: Array<HTMLElement> = reactive<HTMLElement[]>([])

export const lineStyle: LineStyle = reactive<LineStyle>({
  left: 0,
  width: 0,
})

export function getHtmlElment(el: HTMLElement) {
  navbarEl.push(el)
}

// 执行动画tab动画
export async function itemTranslation(currindex = 0) {
  const objStyle: ElementSize = await getTabStyle(currindex, 'offsetLeft', 'offsetWidth')
  lineStyle['left'] = +objStyle.offsetLeft
  lineStyle['width'] = +objStyle.offsetWidth
}

export function initResize(callback: (e: Event) => void): CloseFn {
  // const resizeFn = Math.random().toString(36).substring(2);
  // const cacheFn = {
  //   PROMISE_ID: callback
  // }
  window.addEventListener('resize', callback)
  return () => {
    window.removeEventListener('resize', callback)
  }
}

// 设置tab动画
async function getTabStyle(index: number, ...style: string[]): Promise<ElementSize> {
  return new Promise(async (resolve, reject) => {
    await nextTick()
    try {
      if (navbarEl[index]) {
        let a: ElementSize = {}
        for (let i = 0, l = style.length; i < l; i += 1) {
          a[style[i]] = navbarEl[index][style[i]]
        }
        resolve(a)
      } else {
        reject()
      }
    } catch (e) {
      reject(e)
    }
  })
}

// 监听滚动条
// 监听函数
function monitorFn(callback: (e: Event) => void) {
  return function(e: Event) {
    callback(e)
  }
}

export function initNavBarAnimation(callback: (e: Event) => void) {
  const fn =  monitorFn(callback)
  window.addEventListener('scroll', fn)

  return function () {
    window.removeEventListener('scroll', fn)
  }
}
