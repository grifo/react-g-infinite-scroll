import React from 'react'

import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import DemoComponentWrapper from './DemoComponentWrapper'

storiesOf('Infinite Scroll', module)
  .add('withInfiniteScroll HOC', () => (
    <DemoComponentWrapper
      expectRef={boolean('Expect ref', false)}
      offset={number('Offset (px)', 20)}
      log={action('Fetching page')}
    />
  ))
