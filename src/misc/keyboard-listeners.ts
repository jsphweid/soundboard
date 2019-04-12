import { initKeyListeners } from '../keys'
import { handleKeyPressOrClick } from './events'
import { getStores } from '../stores'
import { keyboardKeys } from '../board-layout'

export function createKeyboardListeners() {
  const keyMap = {} as any
  keyboardKeys.forEach(keys => {
    keys.forEach(key => {
      keyMap[key] = () => handleKeyPressOrClick(key)
    })
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
