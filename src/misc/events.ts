import { getStores } from '../stores'
import { KeyboardKey, isKeyboardKey } from '../misc-types'

export function handleKeyPressOrClick(key: KeyboardKey) {
  const { actionButtons, tabButtons, soundPlayer } = getStores()

  if (isKeyboardKey(key)) {
    const button = tabButtons.getButtonByKeyboardKey(key)
    if (button) {
      tabButtons.changeTab(button.id)
    }
  } else {
    const button = actionButtons.getButtonByKeyboardKey(key)
    if (button) {
      soundPlayer.triggerSound(button.id)
    }
  }
}
