import React from 'react'

import { storiesOf } from '@storybook/react'
import { ActionButtonWithCoords, TabButtonWithCoords } from './button'
import Board from './board'
import { ButtonType } from '../misc-types'

const defaultActionButton: ActionButtonWithCoords = {
  coords: { x: 0, y: 0 },
  type: ButtonType.Action,
  title: 'some title',
  keyboardKey: 'a',
  id: '123',
  tabId: 'tab1',
  url: 'http://google.com',
  start: 2,
  end: 4
}

const defaultTabButton: TabButtonWithCoords = {
  coords: { x: 1, y: 3 },
  type: ButtonType.Tab,
  title: 'some title',
  keyboardKey: '1',
  id: '124'
}

storiesOf('Board', module)
  .add(`just board`, () => <Board buttons={[]} />)
  .add(`board with a few buttons`, () => (
    <Board buttons={[defaultActionButton, defaultTabButton]} />
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
