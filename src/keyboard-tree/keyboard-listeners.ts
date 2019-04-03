import { initKeyListeners } from '../keys'
import { handleKeyPressOrClick } from './tree-events'
import BoardLayout from '../stores/board-layout'

export function createKeyboardListeners() {
  const keyMap = {} as any
  ;[...BoardLayout.hotkeys.flat(), ...BoardLayout.tabs.flat()].forEach(key => {
    keyMap[key] = () => handleKeyPressOrClick(key)
  })

  initKeyListeners(keyMap)
}
