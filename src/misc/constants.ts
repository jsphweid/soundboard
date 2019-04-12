import { ButtonType, ActionButton, TabButton } from '../misc-types'
import { generateRandomId } from './helpers'

export const leafPic = `https://res.cloudinary.com/dx6f6g5cv/image/upload/c_scale,o_12,q_43,w_534/v1552677118/speakers-sound-icon-music-0a3787-1024_t1snbx.png`
export const branchPic = `https://res.cloudinary.com/dx6f6g5cv/image/upload/c_scale,o_12,q_32,w_463/v1554043826/1_xUVx8GVAl1AFgb9wp-PlyA_msxm5k.jpg`

export const apiBaseUrl = `https://rzav759n25.execute-api.us-east-1.amazonaws.com/dev/soundboard`

export const defaultActionButtons = [
  {
    url: 'https://www.myinstants.com/media/sounds/mlg-airhorn.mp3',
    title: `airhorn`,
    type: ButtonType.Action,
    keyboardKey: 'q',
    tabId: 'tab1',
    id: generateRandomId()
  },
  {
    url: 'https://www.myinstants.com/media/sounds/sound-9.mp3',
    title: `wolololo`,
    type: ButtonType.Action,
    keyboardKey: 'w',
    tabId: 'tab1',
    id: generateRandomId()
  },
  {
    url: 'https://www.myinstants.com/media/sounds/sitcom-laughing-1.mp3',
    title: `laugh`,
    type: ButtonType.Action,
    start: 1,
    keyboardKey: 'a',
    tabId: 'tab2',
    id: generateRandomId()
  },
  {
    url: 'https://www.myinstants.com/media/sounds/jeopardy-theme-lowq.mp3',
    title: `jeopardy`,
    type: ButtonType.Action,
    keyboardKey: 'b',
    start: 0.1,
    end: 3.75,
    tabId: 'tab3',
    id: generateRandomId()
  }
] as ActionButton[]

export const defaultTabButtons = [
  {
    type: ButtonType.Tab,
    title: 'tab 1',
    keyboardKey: '1',
    id: 'tab1'
  },
  {
    type: ButtonType.Tab,
    title: 'tab 2',
    keyboardKey: '2',
    id: 'tab2'
  },
  {
    type: ButtonType.Tab,
    title: 'tab 3',
    keyboardKey: '3',
    id: 'tab3'
  },
  {
    type: ButtonType.Tab,
    title: 'tab 4',
    keyboardKey: '4',
    id: 'tab4'
  },
  {
    type: ButtonType.Tab,
    title: 'tab 5',
    keyboardKey: '5',
    id: 'tab5'
  }
] as TabButton[]
