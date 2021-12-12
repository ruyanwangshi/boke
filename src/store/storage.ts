export default function secretPiniaPlugin(app) {
  const store = app.store
  const piniaId = 'pinia'
  const piniaIdList: string  =  localStorage.getItem(piniaId) || ""
  const storeList = new Set(piniaIdList)
  console.log('storeList=>', JSON.parse(piniaIdList))
  console.log('store=>', storeList)
  store.$subscribe((mutation, state) => {
    // // import { MutationType } from 'pinia'
    // mutation.type // 'direct' | 'patch object' | 'patch function'
    // // same as cartStore.$id
    // mutation.storeId // 'cart'
    // // only available with mutation.type === 'patch object'
    // mutation.payload // patch object passed to cartStore.$patch()
    console.log(state)
    console.log(mutation.storeId)
    console.log(JSON.stringify(state))
    storeList.add(mutation.storeId)
    localStorage.setItem(mutation.storeId, JSON.stringify(state))
    localStorage.setItem(piniaId, JSON.stringify(storeList))
  })
}
