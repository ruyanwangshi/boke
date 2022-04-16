<!-- 文章内容组件 -->
<template>
  <div class="md-wrapper__container">
    <div class="md-wrapper__title">{{ MDContent.filename }}</div>
    <div v-html="MDContent.text"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'container',
  props: {
    MDContent: {
      type: Object,
      default() {
        return []
      },
    },
  },
})
</script>

<style lang="stylus" scoped></style>
<style module>
pre,
code {
  font-size: 14px;
  font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
  margin: auto 5px;
}

code {
  white-space: pre-wrap;
  border-radius: 2px;
  display: inline;
}

pre {
  font-size: 15px;
  line-height: 1.4em;
  display: block;
}

pre code {
  white-space: pre;
  overflow: auto;
  border-radius: 3px;
  padding: 1px 1px;
  display: block !important;
}

strong,
b {
  color: #bf360c;
}

em,
i {
  color: #009688;
}

hr {
  border: 1px solid #bf360c;
  margin: 1.5em auto;
}

p {
  margin: 1.5em 5px !important;
}

table,
pre,
dl,
blockquote,
q,
ul,
ol {
  margin: 10px 5px;
}

ul,
ol {
  padding-left: 15px;
}

li {
  margin: 10px;
}

li p {
  margin: 10px 0 !important;
}

ul ul,
ul ol,
ol ul,
ol ol {
  margin: 0;
  padding-left: 10px;
}

ul {
  list-style-type: circle;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 1em;
  font-weight: bold;
  font-style: italic;
}

dl dd {
  margin: 0 0 10px;
  padding: 0 10px;
}

blockquote,
q {
  border-left: 2px solid #009688;
  padding: 0 10px;
  color: #777;
  quotes: none;
  margin-left: 1em;
}

blockquote > p {
  padding: 10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  line-height: 16px;
  color: #fff;
}

blockquote::before,
blockquote::after,
q::before,
q::after {
  content: none;
}

h1 {
  font-size: 24px !important;
  border-bottom: 1px solid #ddd !important;
}

h2 {
  font-size: 20px !important;
  border-bottom: 1px solid #eee !important;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 16px;
}

table {
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
  font: inherit;
  border: 0;
  margin: 0 auto;
}

tbody {
  margin: 0;
  padding: 0;
  border: 0;
}

table tr {
  border: 0;
  border-top: 1px solid #ccc;
  background-color: white;
  margin: 0;
  padding: 0;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

table tr th,
table tr td {
  font-size: 16px;
  border: 1px solid #ccc;
  margin: 0;
  padding: 5px 10px;
}

table tr th {
  font-weight: bold;
  color: #eee;
  border: 1px solid #009688;
  background-color: #009688;
}

#area > table {
  width: 100%;
  table-layout: fixed;
}

#area table tr td {
  margin: 0;
  padding: 6px;
  border: 0;
}

#md-area {
  width: 100%;
  height: 600px;
  font-size: 18px;
  overflow: hidden;
  font-weight: bold;
  outline: none;
}

#show-area {
  height: 600px;
  background-color: #fcf6e5;
}

.clearfix:before {
  content: '';
  display: table;
}
</style>
