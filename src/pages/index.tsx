import * as React from 'react'
import Board from '../components/board'

import './index.css'
import LoadBoardModal from '../components/load-board-modal'
import SaveBoardModal from '../components/save-board-modal'
import { getStores } from '../stores'
import { observer } from 'mobx-react'

export default observer(() => (
  <div className="prevent-selection">
    <Board
      handleMove={getStores().buttons.moveButton}
      buttons={getStores().buttons.currentButtonsInTab}
    />
    <LoadBoardModal />
    <SaveBoardModal />
  </div>
))
