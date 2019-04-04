import * as React from 'react'
import Board from '../components/board'

import './index.css'
import './react-contextmenu.css'

export default () => (
  <div className="prevent-selection">
    <Board />
  </div>
)
