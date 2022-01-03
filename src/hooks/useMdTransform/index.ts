import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

interface HtmlString {
  filename: string
  text: string
  catalogueText: string
}

const regexAllNotes = /<!--.*-->/g
const regexEndNotes = /<!-- END.*-->/g

export function useMdTransform(md: HtmlString | Array<HtmlString>, jshl?: boolean): Array<HtmlString> | HtmlString {
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
      let HtmlText: string
      let mdtext = marked(md[i].text, config)
      let catalogueText: string
      let mdtextArray: string[]

      // 判断是否有目录
      if (regexAllNotes.test(mdtext)) {
        mdtextArray = mdtext.split(regexEndNotes)
        catalogueText = mdtextArray[0].replace(regexAllNotes, '').trim()
        HtmlText = mdtextArray[1]
      } else {
        HtmlText = mdtext
        catalogueText = ''
      }

      const result = Object.assign(md[i], {
        filename: md[i].filename,
        text: HtmlText,
        catalogueText,
      })
      HtmlStringList.push(result)
    }
    return HtmlStringList
    
  } else {

    let HtmlText: string
    let catalogueText: string
    let mdtext = marked(md.text, config)
    let mdtextArray: string[]

    if (regexAllNotes.test(mdtext)) {
      mdtextArray = mdtext.split(regexEndNotes)
      catalogueText = mdtextArray[0].replace(regexAllNotes, '').trim()
      HtmlText = mdtextArray[1]
    } else {
      HtmlText = mdtext
      catalogueText = ''
    }

    HtmlString = {
      filename: md.filename,
      text: HtmlText,
      catalogueText,
    }
    return HtmlString
  }
}
