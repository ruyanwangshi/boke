import dayjs from 'dayjs'

function getTime(val: string) {
  return dayjs(val).format('YYYY-MM-DD')
}

export { getTime }
