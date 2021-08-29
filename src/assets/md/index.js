// const { readdir, readFile } = require('fs')
// const path = require('path')
// console.log(require('fs'))

import fs from 'fs'
import path from 'path'

function resolve(resolve) {
  return path.resolve(__dirname, resolve)
}

const readFilePath = resolve('./mdfile')

function ReadMdFile(callback) {
  const mdData = []
  fs.readdir(readFilePath, (err, file) => {
    if (err) {
      callback(err, null)
    } else {
      for (let i = 0, l = file.length; i < l; i += 1) {
        fs.readFile(resolve(`${readFilePath}/${file[i]}`), 'utf-8', (err, data) => {
          if (err) {
            callback(err, null)
          } else {
            mdData.push({
              [file[i]]: data,
            })
            if (mdData.length === file.length) {
              callback(null, mdData)
            }
          }
        })
      }
    }
  })
}
// const mdData = []
// fs.readdir(readFilePath, (err, file) => {
//   if (err) {
//   } else {
//     for (let i = 0, l = file.length; i < l; i += 1) {
//       fs.readFile(resolve(`${readFilePath}/${file[i]}`), 'utf-8', (err, data) => {
//         //   console.log(data)
//         if (err) {
//         } else {
//           mdData.push({
//             [file[i]]: data,
//           })
//           if (mdData.length === file.length) {
//             console.log(mdData)
//           }
//         }
//       })
//     }
//   }
// })

export { ReadMdFile }
