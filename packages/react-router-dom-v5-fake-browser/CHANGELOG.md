## 2.0.0 (25 oct 2026)

### Internal changes

* Switch to a buildless workflow using [typescript JSDoc integration](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

### Breaking changes

* Removed `styled-components`
* `@vtaits/react-fake-browser-ui` moved to `peerDependencies` and should be installed manually
* The styles should be imported manually now `import '@vtaits/react-fake-browser-ui/styles.css';`
