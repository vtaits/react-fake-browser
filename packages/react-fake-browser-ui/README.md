[![NPM](https://img.shields.io/npm/v/@vtaits/react-fake-browser-ui.svg)](https://www.npmjs.com/package/@vtaits/react-fake-browser-ui)

# @vtaits/react-fake-browser-ui

UI elements for creating fake browsers:

- `NavBar` - navigation component (address input + buttons) only;

- `FakeBrowser` - navigation component + children;

```javascript
import {
  FakeBrowser,
  NavBar,
} from '@vtaits/react-fake-browser-ui'
```

### Props

| Name | Type |
|------|------|
| canMoveForward | boolean |
| canMoveBack | boolean |
| currentAddress | string |
| refresh | () => void |
| goBack | () => void |
| goForward | () => void |
| goTo | (nextAddress: string) => void |
