import { nextTick } from 'vue'

async function getBodyHeight() {
    await nextTick()
    const body = document.documentElement.offsetHeight || 0
    return body
}

export default getBodyHeight