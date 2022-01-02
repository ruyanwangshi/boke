import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

interface HtmlString {
  filename: string
  text: string
}

export function useMdTransform(md: HtmlString | Array<HtmlString> , jshl?: boolean): Array<HtmlString> | HtmlString {
  const HtmlStringList: HtmlString[] = []
  let HtmlString: HtmlString
  const config = jshl
    ? {
        highlight: (code, lang) => {
          return hljs.highlight(code, {
            language: lang,
          }).value
        },
      }
    : {}

  if (Array.isArray(md)) {
    for (let i = 0, l = md.length; i < l; i += 1) {
      const result = Object.assign(md[i], {
        filename: md[i].filename,
        text: marked(md[i].text, config),
      })
      HtmlStringList.push(result)
    }
    return HtmlStringList
  } else {
    HtmlString = {
      filename: md.filename,
      text: marked(md.text, config),
    }
    return HtmlString
  }
}
