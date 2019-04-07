import * as React from 'react'
import { getStores } from '../stores'
const ReactFitText = require('react-fittext')

interface Props {}

const trash = () => {
  const { blockWidth, blockHeight, activeLayoutType } = getStores().activeLayout
  return activeLayoutType === 'landscapeLayout' ? (
    <img
      style={{
        position: `absolute`,
        right: `0`,
        bottom: `0`,
        width: `${blockWidth}px`,
        height: `${blockHeight}px`
      }}
      src="https://res.cloudinary.com/dx6f6g5cv/image/upload/c_scale,q_28,w_450/v1554413038/Trash_bin_lulho1.png"
      alt=""
    />
  ) : null
}
const Menu: React.SFC<Props> = () => {
  const { openLoadBoardModal } = getStores().loadBoard
  const { openSaveBoardModal } = getStores().saveBoard

  return (
    <div style={{ padding: `8px` }}>
      <ReactFitText>
        <h1 style={{ margin: `0px`, textAlign: 'center' }}>Best Soundboard</h1>
      </ReactFitText>
      <p>
        A small webapp for triggering sounds via a soundboard by{' '}
        <a href="https://josephweidinger.com">Joseph Weidinger</a>.
      </p>
      <p>
        You can trigger sounds by clicking on the buttons or by hitting the
        keyboard key that corresponds to the tile that the button sits on.
      </p>
      <p>
        The board can be easily configured and shared: Simply double click drag
        a button around. You can delete a button by dragging it in this menu
        area.
      </p>
      {/* <button onClick={openLoadBoardModal}>Load</button> */}
      <p>
        Finally, by clicking the share button below, you can save the state of
        the board and freely share it with anyone else:
      </p>
      <button onClick={openSaveBoardModal}>Share This Board</button>
      {trash()}
    </div>
  )
}

export default Menu
