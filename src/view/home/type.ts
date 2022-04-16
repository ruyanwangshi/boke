export interface StateType {
    MdArray: ArticleItem[] | null
    [key:string]: any
}

export interface ArticleItem {
    createTime: string
    fileName: string
    type: string
  }