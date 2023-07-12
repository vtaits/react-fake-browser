[![NPM](https://img.shields.io/npm/v/@vtaits/react-router-dom-fake-browser.svg)](https://www.npmjs.com/package/@vtaits/react-router-dom-fake-browser)

![demo](https://user-images.githubusercontent.com/4801414/198836853-0624db99-a751-40c1-b056-3e30ca594bd7.gif)

# @vtaits/react-router-dom-fake-browser

Embeddable fake browser based on `MemoryRouter` from `react-router-dom`

## Installation

```sh
yarn add @vtaits/react-router-dom-fake-browser styled-components
```

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
