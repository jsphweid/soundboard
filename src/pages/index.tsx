import * as React from 'react'
import Board from '../components/board'

import './index.css'
import { getStores } from '../stores'
import { observer } from 'mobx-react'
import Details from '../components/details'

export default observer(() => (
  <div>
    <Board
      handleMove={getStores().buttons.moveButton}
      buttons={getStores().buttons.currentButtonsInTab}
    />
    <Details />
  </div>
))
