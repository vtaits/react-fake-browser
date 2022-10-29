import type {
  ReactNode,
} from 'react';

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
};

export const example = (args): ReactNode => (
  <Browser
    {...args}
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

example.args = {
  initialEntries: ['/one', '/two', '/three'],
  initialIndex: 0,
};
