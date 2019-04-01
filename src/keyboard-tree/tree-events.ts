import { getStores } from '../stores'
import { ValidTreeThing } from './valid-tree-thing'
import { KeyboardTreeType } from '../stores/keyboard-tree'

export function handleKeyPressOrClick(key: ValidTreeThing) {
  const { keyboardTree, soundPlayer } = getStores()
  const thing = keyboardTree.currentTreeViewMap[key]

  if (!thing) {
    console.log(`No item exists for ${key} on this tier.`)
    return
  }

  if (thing.type === KeyboardTreeType.Branch) {
    keyboardTree.goInto(key)
  } else {
    soundPlayer.triggerSound(thing.data.soundInfo.soundInfoId)
  }
}
