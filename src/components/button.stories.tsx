import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import { storiesOf } from '@storybook/react'
import Button, { ActionButtonWithCoords, TabButtonWithCoords } from './button'
import { ButtonType } from '../buttons/types'

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
    () => <Button button={button} onClick={action('clicked')} />
  )

  stories.addDecorator(withKnobs)

  // Knobs as dynamic variables.
  stories.add(`${buttonType} button w/ flexible container`, () => {
    const height = number('height', 400)
    const width = number('width', 400)

    return (
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,
          backgroundColor: '#999999',
          padding: `8px`
        }}
      >
        <Button button={defaultActionButton} onClick={action('clicked')} />
      </div>
    )
  })
})
