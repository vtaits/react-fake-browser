import type {
  ReactNode,
} from 'react';
import {
  withKnobs,
  number,
  array,
} from '@storybook/addon-knobs';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  Browser,
} from '..';

export default {
  title: 'react-router-dom-fake-browser',
  decorators: [withKnobs],
};

export const example = (): ReactNode => (
  <Browser
    initialEntries={array('initialEntries', ['/one', '/two', '/three'])}
    initialIndex={number('initialIndex', 0)}
  >
    <Switch>
      <Route
        path="/one"
        render={(): ReactNode => (
          <h1>
            Hello &quot;/one&quot;
          </h1>
        )}
      />

      <Route
        path="/two"
        render={(): ReactNode => (
          <h1>
            Hello &quot;/two&quot;
          </h1>
        )}
      />

      <Route
        path="/three"
        render={(): ReactNode => (
          <h1>
            Hello &quot;/three&quot;
          </h1>
        )}
      />
    </Switch>

    <ul>
      <li>
        <Link
          to="/one"
        >
          one
        </Link>
      </li>

      <li>
        <Link
          to="/two"
        >
          two
        </Link>
      </li>

      <li>
        <Link
          to="/three"
        >
          three
        </Link>

      </li>
    </ul>
  </Browser>
);
