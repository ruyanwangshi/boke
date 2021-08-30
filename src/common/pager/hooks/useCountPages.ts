// export function useCountPages(numData: string | number, pageNumber: string | number) {
//   numData = +numData
//   pageNumber = +pageNumber
//   if (numData % pageNumber > 0) {
//     pageNumber -= 1
//   }

//   const pageCount = numData / pageNumber + 1
//   return pageCount
// }

export function useCountPages(numData: number, pageNumber: number) {
  let pageCount
  numData = numData
  pageNumber = pageNumber

  if (numData % pageNumber > 0) {
    const num = (numData / pageNumber).toString()
    pageCount = parseInt(num, 10) + 1
    return pageCount
  }

  pageCount = Math.ceil(numData / pageNumber)
  return pageCount
}
