import React from 'react'

import { storiesOf } from '@storybook/react'
import Board from './board'
import { ButtonType, ActionButton, TabButton } from '../misc-types'

const defaultActionButton: ActionButton = {
  type: ButtonType.Action,
  title: 'some title',
  keyboardKey: 'a',
  id: '123',
  tabId: 'tab1',
  url: 'http://google.com',
  start: 2,
  end: 4
}

const defaultTabButton: TabButton = {
  type: ButtonType.Tab,
  title: 'some title',
  keyboardKey: '1',
  id: '124'
}

storiesOf('Board', module)
  .add(`just board`, () => <Board handleMove={() => null} buttons={[]} />)
  .add(`board with a few buttons`, () => (
    <Board
      handleMove={() => null}
      buttons={[defaultActionButton, defaultTabButton]}
    />
  ))

// stories.addDecorator(withKnobs)

// // Knobs as dynamic variables.
// stories.add(`a few buttons`, () => {
//   const height = number('height', 400)
//   const width = number('width', 400)

//   return (
//     <div
//       style={{
//         height: `${height}px`,
//         width: `${width}px`,
//         backgroundColor: '#999999',
//         padding: `8px`
//       }}
//     >
//       <Button button={button} onClick={action('clicked')} />
//     </div>
//   )
// })
