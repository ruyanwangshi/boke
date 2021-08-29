const marked = require('marked')
const hljs = require('highlight.js')
module.exports = (content) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  const MarkedHtml = marked(content)
  // const html = hljs.highlight('<h1>Hello World!</h1>', {language: 'xml'}).value
  // const res = hljs.highlight(`${MarkedHtml}`, {language: 'html'}).value
  // const res = hljs.highlightAuto('<h1>Hello World!</h1>').value
  // const MarkedHtmlString = '`' + res + '`'
  // console.log(hljs.highlightAuto('<h1>Hello World!</h1>').value)
  const MarkedHtmlString = '`' + MarkedHtml + '`'
  
  const moduleMd = `var code=${MarkedHtmlString}; export default code`
  console.log(moduleMd)
  return moduleMd
}
