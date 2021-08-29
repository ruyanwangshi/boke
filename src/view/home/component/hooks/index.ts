import marked from 'marked'
import hljs from 'highlight.js'

interface HtmlString {
  filename: string
  text: string
}

export function useMdTransform(md: string | Array<HtmlString>, jshl?: boolean): Array<HtmlString> {
  const HtmlString: HtmlString[] = []
  const config = jshl
    ? {
        highlight: (lang, code) => {
          return hljs.highlight(code, lang).value
        },
      }
    : {}

  if (Array.isArray(md)) {
    for (let i = 0, l = md.length; i < l; i += 1) {
      HtmlString.push({
        filename: md[i].filename,
        text: marked(md[i].text, config),
      })
    }
  } else {
    HtmlString.push(marked(md, config))
  }
  return HtmlString
}
