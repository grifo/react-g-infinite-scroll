import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import DemoComponent from './DemoComponent'

storiesOf('Infinite Scroll', module)
  .add('InfiniteScroll component', () => (
    <DemoComponent
      expectRef={boolean('Expect ref', false)}
      offset={number('Offset (px)', 20)}
      log={action('Fetching page')}
    />
  ))
