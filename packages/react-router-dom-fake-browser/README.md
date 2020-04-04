[![NPM](https://img.shields.io/npm/v/@vtaits/react-router-dom-fake-browser.svg)](https://www.npmjs.com/package/@vtaits/react-router-dom-fake-browser)

# @vtaits/react-router-dom-fake-browser

Embeddable fake browser based on `MemoryRouter` from `react-router-dom`

## Examples

- [Simple](https://codesandbox.io/s/sv055)

## Usage

```javascript
import {
  Browser,
} from '@vtaits/react-router-dom-fake-browser';
import {
  Route,
  Link,
} from 'react-router-dom';

...

<Browser>
  <Route
    path="/index/"
    render={() => 'Hello world'}
  />

  <Link
    to="/notindex/"
  >
    Go
  </Link>
</Browser>
```

### Advanced usage

#### Providing props to MemoryRouter

```javascript
<Browser
  initialEntries={['/one', '/two', '/three']}
  initialIndex={1}
>
  Helo
</Browser>
```