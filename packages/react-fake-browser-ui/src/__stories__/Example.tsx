import type {
  ReactElement,
} from 'react';

import { action } from '@storybook/addon-actions';

import {
  FakeBrowser,
  type FakeBrowserProps,
} from '../FakeBrowser';

export function Example(props: FakeBrowserProps): ReactElement {
  return (
    <FakeBrowser
      refresh={action('refresh')}
      goBack={action('goBack')}
      goForward={action('goForward')}
      goTo={action('goTo')}
      {...props}
    >
      Hello, world!
    </FakeBrowser>
  );
}
