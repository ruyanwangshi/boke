import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

interface HtmlString {
  filename: string
  text: string
}

export function useMdTransform(md: string | Array<HtmlString>, jshl?: boolean): Array<HtmlString> {
  const HtmlString: HtmlString[] = []
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
      const result = Object.assign(
        {
          filename: md[i].filename,
          text: marked(md[i].text, config),
        },
        md[i]
      )
      HtmlString.push(result)
    }
  } else {
    HtmlString.push(marked(md, config))
  }
  return HtmlString
}
