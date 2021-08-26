import { ref, nextTick, reactive, Ref, Component } from 'vue'

interface styleObj {
  [key: string]: string
}

interface ElNumber {
  [key: string]: string
}

interface lineStyle {
  [key: string]: number | string
}

let styleObj: styleObj
const navbarEl: Array<HTMLElement> = reactive<HTMLElement[]>([])
export const lineStyle: lineStyle = reactive<lineStyle>({
  left: 0,
  width: 0,
})
export const currindex = ref<number>(0)

export function getHtmlElment(el: HTMLElement) {
  navbarEl.push(el)
}

// 执行动画tab动画
export async function itemTranslation() {
  const objStyle: ElNumber = await getTabStyle(currindex.value, 'offsetLeft', 'offsetWidth')
  lineStyle['left'] = +objStyle.offsetLeft 
  lineStyle['width'] = +objStyle.offsetWidth
}

// 设置tab动画
async function getTabStyle(index: number, ...style: string[]): Promise<ElNumber> {
  return new Promise(async (resolve, reject) => {
    await nextTick()
    try {
      if (navbarEl[index]) {
        let a: ElNumber = {}
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
