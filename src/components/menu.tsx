import * as React from 'react'
import { getStores } from '../stores'

interface Props {}

const Menu: React.SFC<Props> = () => {
  const { blockWidth, blockHeight } = getStores().activeLayout
  const { openLoadBoardModal } = getStores().loadBoard
  const { openSaveBoardModal } = getStores().saveBoard

  return (
    <div>
      <h1 style={{ fontSize: `144px`, margin: `0px` }}>SB</h1>
      <button onClick={openLoadBoardModal}>Load</button>
      <button onClick={openSaveBoardModal}>Share</button>
      <img
        style={{
          width: `${blockWidth}px`,
          height: `${blockHeight}px`
        }}
        src="https://res.cloudinary.com/dx6f6g5cv/image/upload/c_scale,q_28,w_450/v1554413038/Trash_bin_lulho1.png"
        alt=""
      />
    </div>
  )
}

export default Menu
