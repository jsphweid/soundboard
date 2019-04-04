import { initKeyListeners } from '../keys'
import BoardLayout from '../stores/board-layout'
import { handleKeyPressOrClick } from './events'

export function createKeyboardListeners() {
  const keyMap = {} as any
  ;[...BoardLayout.hotkeys.flat(), ...BoardLayout.tabs.flat()].forEach(key => {
    keyMap[key] = () => handleKeyPressOrClick(key)
  })

  initKeyListeners(keyMap)
}
