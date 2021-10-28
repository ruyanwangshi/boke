import dayjs from 'dayjs'

function getTime(val: string, format: string = 'YYYY-MM-DD') {
  return dayjs(val).format(format)
}

export { getTime }
