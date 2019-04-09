import * as React from 'react'
import { observer } from 'mobx-react'
import { ActionButtonWithCoords } from './button'
const resizeAware = require('react-resize-aware')
const ResizeAware = resizeAware.default || resizeAware

interface State {
  activeLayout: 'landscapeLayout' | 'portraitLayout'
  buttonThatsBeingDragged: ActionButtonWithCoords | null // TODO: any...?
  everythingLoaded: boolean
}

export interface Layout {
  numBlocksWide: number
  numBlocksHigh: number
  blockWidth: number
  blockHeight: number
  blockWidthPercent: number
  blockHeightPercent: number
  keyboardKeySize: number
  titleSize: number
  actionKeysSection: LayoutSection
  tabKeysSection: LayoutSection
  menuSection: LayoutSection
}
interface Props {}

export interface LayoutSection {
  height: number
  width: number
  x: number
  y: number
}

export interface Dimensions {
  height: number
  width: number
}

@observer
export default class Board extends React.Component<Props, State> {
  private els: { board: any } = { board: null }

  constructor(props: Props) {
    super(props)
    this.state = {
      activeLayout: 'landscapeLayout',
      buttonThatsBeingDragged: null,
      everythingLoaded: false
    }
  }

  public render() {
    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={() => console.log('surprise')}
        id="sb-board"
        style={{
          position: 'relative',
          width: '100vw',
          height: `100vh`
        }}
      >
        hi
      </ResizeAware>
    )
  }
}
