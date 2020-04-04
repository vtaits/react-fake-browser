import React, {
  ReactNode,
} from 'react';
import {
  withKnobs,
  boolean,
  text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import {
  FakeBrowser,
} from '..';

export default {
  title: 'react-fake-browser-ui',
  decorators: [withKnobs],
};

export const fakeBrowser = (): ReactNode => (
  <FakeBrowser
    canMoveForward={boolean('canMoveForward', false)}
    canMoveBack={boolean('canMoveBack', false)}
    currentAddress={text('currentAddress', '')}
    refresh={action('refresh')}
    goBack={action('goBack')}
    goForward={action('goForward')}
    goTo={action('goTo')}
  >
    Hello, world!
  </FakeBrowser>
);
