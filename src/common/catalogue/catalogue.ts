let title = 0
const allHeaders = new Map()
export function initSidebar(catalogContainer: string, mdContent: string): boolean {
  if (!(typeof catalogContainer === 'string' || typeof mdContent === 'string')) return false

  const catalogContainerEl = document.querySelector(catalogContainer)
  const mdContentEl = document.querySelector(mdContent)
  title = 0 // 初始化title样式
  allHeaders.clear()
  if (!mdContent || !catalogContainerEl) return false

  const headers = initHeaders(mdContentEl)

  if (!headers?.length) return false
  
  const elList = createList(headers!)

  createListDom(elList, catalogContainerEl)
  return true
}

function initHeaders(mdContentEl: Element | null): Element[] | null {
  if (typeof mdContentEl === null) return null
  let count = 1
  let headers = []
  while (!headers.length && count <= 6) {
    headers = Array.from(mdContentEl!.querySelectorAll('h' + count++))
  }
  return headers
}

interface ElList {
  title?: Element
  childrens?: Element[] | null
  childrenItem?: ElList[] | null
}

function createList(headers: any[], elList: ElList[] = [], key: string = 'title') {
  title++

  headers.forEach((h, i) => {
    const titleEl = makeLink(h, 'li', `h${title}-link`)
    allHeaders.set(titleEl, h)
    const childrens = collectHs(h)
    elList.push({
      title: titleEl,
      childrens: childrens,
      childrenItem: [],
    })
    if (Array.isArray(childrens) && childrens.length) {
      createList(childrens, elList[i].childrenItem!)
    }
  })
  return elList
}

function createListDom(elList: ElList[], root: Element) {
  if (!elList.length) return
  elList.forEach((item) => {
    root.appendChild(item.title!)
    if (item.childrenItem && item.childrenItem.length) {
      createListDom(item.childrenItem, item.title!)
    }
  })
}

interface StyleAttr {
  [key: string]: any
}

function createEl(type: string, props?: StyleAttr, children?: any[] | string, root?: HTMLElement): HTMLElement {
  const el = document.createElement(type)
  for (const key in props) {
    if (/^on/.test(key)) {
      const event = key.substr(2).toLowerCase()
      el.addEventListener(event, props[key])
    } else {
      el[key] = props[key]
    }
  }
  if (typeof children === 'string') {
    el.textContent = children
  } else {
    children?.forEach((item) => {
      el.appendChild(createEl(item.type, item.props, item.children, el))
    })
  }
  return el
}

function makeLink(h: Element, tag: string, className: string) {
  tag = tag || 'div'
  className = className || ''
  const link = createEl('ul', {
    className: className,
  })
  const text = [].slice
    .call(h.childNodes)
    .map(function(node: HTMLElement) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue
      } else if (['CODE', 'SPAN', 'A', 'STRONG'].indexOf(node.tagName) !== -1) {
        return node.textContent
      } else {
        return ''
      }
    })
    .join('')
    .replace(/\(.*\)$/, '')
  if (!h.id) h.id = IdEscape(text)
  const li = createEl(
    tag,
    {
      className: className,
      'data-link': h.id,
      onClick: (e: Event) => {
        console.log('allHeaders=>', allHeaders)
        e.stopPropagation()
        linkEvent(e, h.id)
      },
    },
    htmlEscape(text)
  )
  link.appendChild(li)
  return link
}

function linkEvent(e: Event, text: string) {
  const returnEle = document.querySelector(`#${text}`)
  if (!!returnEle) {
    returnEle.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function IdEscape(text: string) {
  return text.replace(/[\s"']/g, '_') //注意这里不加 g 的话就会只匹配第一个匹配,所以会出错
}

/**
>HTML 特殊字符[ &, ", ', <, > ]转义
@param {string} text - HTML特殊字符
@returns {string} 转义后的字符,例如`<`被转义为`&lt`
*/
function htmlEscape(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function collectHs(h: Element) {
  const childIndexes: Element[] = []
  const thisTag: string = h.tagName
  let count: number = 1
  let childTag: string
  do {
    childTag = h.tagName[0] + (parseInt(h.tagName[1]) + count++)
    let next: Element | null = h.nextElementSibling
    while (next) {
      if (next.tagName[0] == 'H' && next.tagName[1] <= thisTag[1]) {
        break
      } else if (next.tagName === childTag) {
        childIndexes.push(next)
      }
      next = next.nextElementSibling
    }
  } while (childTag < 'H6' && childIndexes.length == 0)
  return childIndexes
}
