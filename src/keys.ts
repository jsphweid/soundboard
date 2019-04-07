const keyState: { [key: string]: boolean } = {}

function passesKeyDownValidation(e: any): boolean {
  // TODO: in the future, have a different system for
  // dealing with keys like Command / Control / Option / etc.
  return (
    keyState[e.key] !== undefined &&
    e.target &&
    e.target.tagName !== 'INPUT' &&
    e.target.tagName !== 'TEXTAREA' &&
    !e.metaKey
  )
}

function passesKeyUpValidation(e: any): boolean {
  return keyState[e.key] !== undefined
}

export function initKeyListeners(keyCallbackMap: {
  [key: string]: () => void
}) {
  const keysToListenFor = Object.keys(keyCallbackMap)
  keysToListenFor.forEach(key => (keyState[key] = false))

  document.addEventListener('keydown', (e: any) => {
    // ignore if typing in an <input /> for example
    if (passesKeyDownValidation(e)) {
      e.preventDefault()
      const untriggered = !keyState[e.key]
      if (untriggered) {
        keyState[e.key] = true
        keyCallbackMap[e.key]()
      }
    }
  })
  document.addEventListener('keyup', e => {
    if (passesKeyUpValidation(e)) {
      keyState[e.key] = false
    }
  })
}
