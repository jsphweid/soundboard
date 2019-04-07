import { initKeyListeners } from '../keys'
import BoardLayout from '../stores/board-layout'
import { handleKeyPressOrClick } from './events'
import { getStores } from '../stores'

export function createKeyboardListeners() {
  const keyMap = {} as any
  ;[...BoardLayout.hotkeys.flat(), ...BoardLayout.tabs.flat()].forEach(key => {
    keyMap[key] = () => handleKeyPressOrClick(key)
  })

  keyMap.Escape = () => {
    getStores().loadBoard.closeLoadBoardModal()
    getStores().saveBoard.closeSaveBoardModal()
    getStores().soundPlayer.killAllSounds()
  }
  keyMap.Backspace = () => getStores().soundPlayer.killAllSounds()
  keyMap.Delete = () => getStores().soundPlayer.killAllSounds()

  initKeyListeners(keyMap)
}
