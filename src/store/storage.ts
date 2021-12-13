import { ref } from "vue" 
export default function secretPiniaPlugin(app) {
  const store = app.store
  const piniaId = 'pinia'
  const piniaIdList: Array<string> = JSON.parse(localStorage.getItem(piniaId) || '[]')
  const storeList = new Set(piniaIdList)
  storeList.forEach((item) => {
    if (item === store.$id) {
      const storeLacalData = JSON.parse(localStorage.getItem(store.$id) || '{}')
      const newStoreLacalData = ref(storeLacalData)
      store.$store = newStoreLacalData.value
      console.log('newStoreLacalData.value=>', newStoreLacalData.value)
      console.log('store=>', store)
    }
  })
  store.$subscribe((mutation, state) => {
    console.log(`${mutation.storeId}=>`, state)
    localStorage.setItem(mutation.storeId, JSON.stringify(state))
    if (!storeList.has(mutation.storeId)) {
      storeList.add(mutation.storeId)
      localStorage.setItem(piniaId, JSON.stringify([...storeList]))
    }
  })
}
