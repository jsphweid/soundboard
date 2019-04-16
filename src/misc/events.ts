import { getStores } from '../stores'
import { KeyboardKey, isKeyboardKey } from '../misc-types'

export function handleKeyPressOrClick(key: KeyboardKey) {
  const { buttons } = getStores()

  if (isKeyboardKey(key)) {
    const button = buttons.getButtonInCurrentView(key)
    if (button && button.onTrigger) {
      button.onTrigger()
    }
  }
}
