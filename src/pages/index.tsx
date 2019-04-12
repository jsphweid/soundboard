import * as React from 'react'
import Board from '../components/board'

import './index.css'
import './react-contextmenu.css'
import LoadBoardModal from '../components/load-board-modal'
import SaveBoardModal from '../components/save-board-modal'
import { KeyboardKey, EitherButton } from '../misc-types'
import { getStores } from '../stores'

const handleButtonMove = (button: EitherButton, key: KeyboardKey) => {
  console.log('button', button, key)
}

export default () => (
  <div className="prevent-selection">
    <Board
      handleMove={handleButtonMove}
      buttons={getStores().buttons.currentButtonsInTab}
    />
    <LoadBoardModal />
    <SaveBoardModal />
  </div>
)
