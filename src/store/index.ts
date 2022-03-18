import { App } from 'vue'
import { createPinia } from 'pinia'
import secretPiniaPlugin from './storage'
const store = createPinia()
store.use(secretPiniaPlugin())
// import piniaPersist from 'pinia-plugin-persist'
export default function initStore(app: App<Element>) {
  app.use(store)
}
export { store }
