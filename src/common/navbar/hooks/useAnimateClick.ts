import { ref, nextTick, reactive, Ref, Component } from 'vue'

type styleObj = {
  left: number | string
  width: number
}

let styleObj: styleObj

intiAnimate() {
    export function getHtmlElment() {
        const navbarEl: HTMLElement[] = reactive<HTMLElement[]>([])
        function setNavbarEl(el: HTMLElement) {
          navbarEl.push(el)
        }
      
        return { navbarEl, setNavbarEl }
      }
      
      // 初始化tab动画
      export async function initItemBg(currindex?: number) {
        currindex = currindex || 0
        const objStyle: HTMLElement | string = await getTabStyle(currindex, 'offsetLeft', 'offsetWidth')
        styleObj.left = (objStyle as HTMLElement).offsetLeft
        styleObj.width = (objStyle as HTMLElement).offsetWidth
      }
      // 初始化tab动画
      async function itemClick(currindex: number) {
        //   currindex.value = index
        const objStyle: HTMLElement | string = await getTabStyle(currindex, 'offsetLeft', 'offsetWidth')
        styleObj.left = (objStyle as HTMLElement).offsetLeft
        styleObj.width = (objStyle as HTMLElement).offsetWidth
      }
      // 设置tab动画
      async function getTabStyle(index: number, ...style: string[]): Promise<HTMLElement | string> {
        return new Promise(async (resolve, reject) => {
          await nextTick()
          try{
              if (navbarEl.navbar[index]) {
                  const a = {};
                  for (let i = 0, l = style.length; i < l; i += 1) {
                      a[style[i]] = this.$refs.tabbarList[index][
                          style[i]
                      ];
                  }
                  resolve(a);
              } else {
                  reject();
              }
          } catch(e) {
              reject(e);
          }
        })
      }

      return {
          
      }
}
