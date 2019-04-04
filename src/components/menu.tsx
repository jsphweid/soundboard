import * as React from 'react'
import { getStores } from '../stores'
import { fontFamily } from '../misc/constants'

interface Props {}

const Menu: React.SFC<Props> = () => {
  const { blockWidth, blockHeight } = getStores().activeLayout
  return (
    <div>
      <h1 style={{ fontFamily, fontSize: `144px`, margin: `0px` }}>SB</h1>
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
