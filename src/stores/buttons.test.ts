import { ButtonType, EitherButton } from '../misc-types'
import Buttons from './buttons'

describe('ButtonsStore', () => {
  test('that two tabs can swap', () => {
    const buttons = [
      {
        type: ButtonType.Tab,
        keyboardKey: '1',
        id: '123'
      },
      {
        type: ButtonType.Tab,
        keyboardKey: '2',
        id: '456'
      }
    ] as EitherButton[]

    const store = new Buttons(buttons)
    store.moveButton(buttons[0], '2')

    expect(store.buttons).toEqual([
      {
        type: ButtonType.Tab,
        keyboardKey: '2',
        id: '123'
      },
      {
        type: ButtonType.Tab,
        keyboardKey: '1',
        id: '456'
      }
    ])
  })

  test('that a tab can go to a new place with no other button there', () => {
    const buttons = [
      {
        type: ButtonType.Tab,
        keyboardKey: '1',
        id: '123'
      }
    ] as EitherButton[]
    const store = new Buttons(buttons)
    store.moveButton(buttons[0], '2')
    expect(store.buttons).toEqual([
      {
        type: ButtonType.Tab,
        keyboardKey: '2',
        id: '123'
      }
    ])
  })

  test('that an action button can go to a new place with no other button there', () => {
    const buttons = [
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '123',
        tabId: 'tab1'
      }
    ] as EitherButton[]
    const store = new Buttons(buttons)
    store.moveButton(buttons[0], '2')
    expect(store.buttons).toEqual([
      {
        type: ButtonType.Action,
        keyboardKey: '2',
        id: '123',
        tabId: 'tab1'
      }
    ])
  })

  test('that an action button can go to a new place on a different tab with no other button there', () => {
    const buttons = [
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '123',
        tabId: 'tab1'
      }
    ] as EitherButton[]
    const store = new Buttons(buttons)
    store.activeTabId = 'tab2'
    store.moveButton(buttons[0], '2')
    expect(store.buttons).toEqual([
      {
        type: ButtonType.Action,
        keyboardKey: '2',
        id: '123',
        tabId: 'tab2'
      }
    ])
  })

  test('that an action button can go to a new place on a different tab with and swap with another button', () => {
    const buttons = [
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '123',
        tabId: 'tab1'
      },
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '234',
        tabId: 'tab2'
      }
    ] as EitherButton[]
    const store = new Buttons(buttons)
    store.activeTabId = 'tab2'
    store.moveButton(buttons[0], '1')
    expect(store.buttons).toEqual([
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '123',
        tabId: 'tab2'
      },
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '234',
        tabId: 'tab1'
      }
    ])
  })

  test('that an action button can swap with a tab button', () => {
    const buttons = [
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '123',
        tabId: '234'
      },
      {
        type: ButtonType.Tab,
        keyboardKey: '2',
        id: '234'
      }
    ] as EitherButton[]
    const store = new Buttons(buttons)
    store.activeTabId = '234'
    store.moveButton(buttons[0], '2')
    expect(store.buttons).toEqual([
      {
        type: ButtonType.Action,
        keyboardKey: '2',
        id: '123',
        tabId: '234'
      },
      {
        type: ButtonType.Tab,
        keyboardKey: '1',
        id: '234'
      }
    ])
  })

  test('that an action button can move two places and still be good', () => {
    const buttons = [
      {
        type: ButtonType.Action,
        keyboardKey: '1',
        id: '123',
        tabId: '234'
      }
    ] as EitherButton[]
    const store = new Buttons(buttons)
    store.activeTabId = '234'
    store.moveButton(store.buttons[0], '2')
    store.moveButton(store.buttons[0], '3')
    expect(store.buttons).toEqual([
      {
        type: ButtonType.Action,
        keyboardKey: '3',
        id: '123',
        tabId: '234'
      }
    ])
  })
})
