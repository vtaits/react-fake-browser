[![NPM](https://img.shields.io/npm/v/@vtaits/react-fake-browser-ui.svg)](https://www.npmjs.com/package/@vtaits/react-fake-browser-ui)

![demo](https://user-images.githubusercontent.com/4801414/198836853-0624db99-a751-40c1-b056-3e30ca594bd7.gif)

# @vtaits/react-fake-browser-ui

UI elements for creating fake browsers

### Examples

- With `react-router-dom`: [demo](https://codesandbox.io/s/sv055), [package](https://github.com/vtaits/react-fake-browser/tree/master/packages/react-router-dom-fake-browser)

### Usage

- `NavBar` - navigation component (address input + buttons) only;

- `FakeBrowser` - navigation component + children;

```javascript
import {
  FakeBrowser,
  NavBar,
} from '@vtaits/react-fake-browser-ui';
```

#### Props

| Name | Type |
|------|------|
| canMoveForward | boolean |
| canMoveBack | boolean |
| currentAddress | string |
| refresh | () => void |
| goBack | () => void |
| goForward | () => void |
| goTo | (nextAddress: string) => void |
