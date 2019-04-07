import { ButtonType, ActionButton } from '../buttons/types'
import { makeRandomId } from './helpers'

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
    id: makeRandomId()
  },
  {
    url: 'https://www.myinstants.com/media/sounds/sound-9.mp3',
    title: `wolololo`,
    type: ButtonType.Action,
    keyboardKey: 'w',
    tabId: 'tab1',
    id: makeRandomId()
  },
  {
    url: 'https://www.myinstants.com/media/sounds/sitcom-laughing-1.mp3',
    title: `laugh`,
    type: ButtonType.Action,
    keyboardKey: 'a',
    tabId: 'tab2',
    id: makeRandomId()
  },
  {
    url: 'https://www.myinstants.com/media/sounds/jeopardy-theme-lowq.mp3',
    title: `jeopardy`,
    type: ButtonType.Action,
    keyboardKey: 'b',
    tabId: 'tab3',
    id: makeRandomId()
  }
] as ActionButton[]
