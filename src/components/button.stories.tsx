import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number } from '@storybook/addon-knobs'

import { storiesOf } from '@storybook/react'
import Button, { ActionButtonWithCoords, TabButtonWithCoords } from './button'
import { ButtonType } from '../misc-types'

import Draggable from 'react-draggable'

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
  coords: { x: 0, y: 0 },
  type: ButtonType.Tab,
  title: 'some title',
  keyboardKey: '1',
  id: '123'
}
;[
  { buttonType: 'action', button: defaultActionButton },
  { buttonType: 'tab', button: defaultTabButton }
].forEach(({ button, buttonType }) => {
  const stories = storiesOf('Button', module).add(
    `${buttonType} button`,
    () => <Button button={button} onTrigger={action('clicked')} />
  )

  stories.addDecorator(withKnobs)

  // Knobs as dynamic variables.
  stories.add(`${buttonType} button w/ flexible display props`, () => {
    const height = number('height', 400)
    const width = number('width', 400)

    return (
      <Button
        button={button}
        displayProperties={{ height, width, x: 0, y: 0 }}
        onTrigger={action('clicked')}
      />
    )
  })
})

storiesOf('Button', module).add(`draggable`, () => {
  const height = number('height', 400)
  const width = number('width', 400)

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      onStart={() => console.log('onstart')}
      onDrag={() => console.log('ondrag')}
      onStop={() => console.log('onstop')}
    >
      <Button
        button={defaultActionButton}
        onTrigger={() => console.log('--')}
      />
    </Draggable>
  )
})
