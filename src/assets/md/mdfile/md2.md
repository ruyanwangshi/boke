### file-loader 
 备注：该loader在webpack5版本中已废弃，使用asset modules。
 描述：file-loader将一个文件中的import/require()解析为url，并且将文件复制到输出文件中。
> cnpm i -D file-loader 

````javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            // 配置项：
            options: {
                // name: string|Function 默认值：'[contenthash].[ext]'
                // name: '[path][name].[ext]',
                // or
                // name(resourcePath, resourceQuery) {
                // `resourcePath` - `/absolute/path/to/file.js`
                // `resourceQuery` - `?foo=bar` 
                //     return '[contenthash].[ext]'
                // }
                
                // outputPath: string|Function 默认值：undfined
                // 备注：指定用来放置一个多个目标文件的文件系统路径。
                // outputPath: 'img',
                // outputPath(url, resourcePath, context) {
                //     // `resourcePath` 是资源文件的原始绝对路径
                //     // `context` 是存储资源文件（`rootContext`）或 `context` 配置项的目录

                //     // 获取你可以使用的相对路径
                //     // const relativePath = path.relative(context, resourcePath);
                //     return url
                // }
            }
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            // 配置项：
            options: {
                
            }
          },
        ],
      },
    ],
  },
};
````

### url-loader 
 备注：该loader在webpack5版本中已废弃，使用asset modules。
 描述：功能类似file-loader,但是在文件大小(单位字节)低于指定的限制时，可以返回一个DataURL.
> cnpm i -D url-loader 

````javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            // 配置项：
            options: {
                // 自定义需要转换的大小，如果超出大小会自动调用file-loader来进行处理
                // limit: Boolean|Number|String 
                // 备注:指定文件的最大体积（以字节为单位）
                limit: 100 * 1024

                // mimetype: Boolean|String 基础mime-types库实现转换
                // 备注：设置要转换的文件的 MIME 类型。
                // mimetype: false,
                mimetype: 'image/png',

                // encoding: Boolean|String 默认值为：base64
                // 备注：指定用于内联文件的编码。
                encoding: 'base64',

                // fallback: String 默认值为： file-loader
                fallback: require.resolve('responsive-loader'),
                quality: 85,

                // generator：Function  默认值为：mimetype, encoding, content, resourcePath) => mimetype;encoding,base64_content
                generator: (content) => svgToMiniDataURI(content.toString()),
            }
          },
        ],
      },
    ],
  },
};
````

#### 备注：可以单独只是用url-loader因为超过大小会自动调用loader，file-loader的配置项可以在url-loader中配置，但是file-loader必须装