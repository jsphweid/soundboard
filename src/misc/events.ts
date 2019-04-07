import { getStores } from '../stores'
import { ValidKeyboardKey, isValidTabKey } from '../buttons/types'

export function handleKeyPressOrClick(key: ValidKeyboardKey) {
  const { actionButtons, tabButtons, soundPlayer } = getStores()

  if (isValidTabKey(key)) {
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
