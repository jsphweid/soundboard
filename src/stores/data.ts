import { ButtonType, ActionButton } from '../buttons/types'
import { makeRandomId } from '../misc/helpers'

export const mockData: ActionButton[] = [
  {
    title: `airhorn`,
    type: ButtonType.Action,
    keyboardKey: 'q',
    tabId: 'tab1',
    id: makeRandomId(),
    url: 'https://www.myinstants.com/media/sounds/mlg-airhorn.mp3',
    startSeconds: 0
  },
  {
    title: `wolololo`,
    type: ButtonType.Action,
    keyboardKey: 'w',
    tabId: 'tab1',
    id: makeRandomId(),
    url: 'https://www.myinstants.com/media/sounds/sound-9.mp3',
    startSeconds: 0
  },
  {
    title: `laugh`,
    type: ButtonType.Action,
    keyboardKey: 'a',
    tabId: 'tab2',
    id: makeRandomId(),
    url: 'https://www.myinstants.com/media/sounds/sitcom-laughing-1.mp3'
  },
  {
    title: `jeopardy`,
    type: ButtonType.Action,
    keyboardKey: 'b',
    tabId: 'tab3',
    id: makeRandomId(),
    url: 'https://www.myinstants.com/media/sounds/jeopardy-theme-lowq.mp3',
    startSeconds: 0,
    endSeconds: 2
  },
  {
    title: `evil morty`,
    type: ButtonType.Action,
    keyboardKey: `r`,
    tabId: 'tab1',
    id: makeRandomId(),
    url: 'https://www.youtube.com/watch?v=Bk3lknaWI9Q',
    startSeconds: 37,
    endSeconds: 40
  }
]
