/* eslint-disable react/jsx-props-no-spreading */

import type {
  ReactElement,
  ReactNode,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import type {
  NavBarProps,
} from '../NavBar';

import { FakeBrowser } from '../FakeBrowser';
import type {
  FakeBrowserProps,
} from '../FakeBrowser';

type PageObject = {
  getNavBarNode: () => ReactElement<NavBarProps>;
  getChildren: () => ReactNode;
};

const defaultProps: FakeBrowserProps = {
  canMoveForward: false,
  canMoveBack: false,
  currentAddress: '',
  refresh: () => undefined,
  goBack: () => undefined,
  goForward: () => undefined,
  goTo: () => undefined,
  children: <div />,
};

const setup = (props: Partial<FakeBrowserProps>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <FakeBrowser
      {...defaultProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<{
    children: ReactNode[];
  }>;

  const getNavBarNode = () => result.props.children[0] as ReactElement<NavBarProps>;

  const getChildren = () => result.props.children[1] as ReactNode;

  return {
    getNavBarNode,
    getChildren,
  };
};

test('should provide props to NavBar', () => {
  const refresh = jest.fn();
  const goBack = jest.fn();
  const goForward = jest.fn();
  const goTo = jest.fn();

  const page = setup({
    canMoveForward: true,
    canMoveBack: true,
    currentAddress: '/test/',
    refresh,
    goBack,
    goForward,
    goTo,
  });

  const navBarNode = page.getNavBarNode();

  expect(navBarNode.props.canMoveForward).toBe(true);
  expect(navBarNode.props.canMoveBack).toBe(true);
  expect(navBarNode.props.currentAddress).toBe('/test/');
  expect(navBarNode.props.refresh).toBe(refresh);
  expect(navBarNode.props.goBack).toBe(goBack);
  expect(navBarNode.props.goForward).toBe(goForward);
  expect(navBarNode.props.goTo).toBe(goTo);
});

test('should render children', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getChildren()).toBe('test');
});
