import type {
  ReactNode,
} from 'react';

import { action } from '@storybook/addon-actions';

import {
  FakeBrowser,
} from '..';

export default {
  title: 'react-fake-browser-ui',
};

export const fakeBrowser = (args): ReactNode => (
  <FakeBrowser
    refresh={action('refresh')}
    goBack={action('goBack')}
    goForward={action('goForward')}
    goTo={action('goTo')}
    {...args}
  >
    Hello, world!
  </FakeBrowser>
);

fakeBrowser.args = {
  canMoveForward: false,
  canMoveBack: false,
  currentAddress: '',
};
