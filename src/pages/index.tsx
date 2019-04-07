import * as React from 'react'
import Board from '../components/board'

import './index.css'
import './react-contextmenu.css'
import LoadBoardModal from '../components/load-board-modal'
import SaveBoardModal from '../components/save-board-modal'

export default () => (
  <div className="prevent-selection">
    <Board />
    <LoadBoardModal />
    <SaveBoardModal />
  </div>
)
