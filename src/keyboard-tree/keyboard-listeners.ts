// import { initKeyListeners } from '../keys'
// import { ValidTreeThing } from './valid-tree-thing'
// import { layout } from './layout'
// import { handleKeyPressOrClick } from './tree-events'
// import { getStores } from '../stores'

// export function createKeyboardListeners() {
//   const keyMap = {} as any

//   layout.forEach((row, y) => {
//     row.forEach((item, x) => {
//       const key = item as ValidTreeThing
//       keyMap[key] = () => handleKeyPressOrClick(key)
//     })
//   })

//   // reset
//   keyMap.Escape = () => getStores().keyboardTree.reset()

//   // back one
//   keyMap.Delete = () => getStores().keyboardTree.backOne()
//   keyMap.Backspace = () => getStores().keyboardTree.backOne()

//   initKeyListeners(keyMap)
// }
