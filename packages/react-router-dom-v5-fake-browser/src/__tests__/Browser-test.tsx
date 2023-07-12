import {
  useState,
} from 'react';
import type {
  ComponentProps,
  ReactElement,
  ReactNode,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import {
  MemoryRouter,
} from 'react-router-dom';
import type {
  MemoryRouterProps,
} from 'react-router-dom';

import type {
  NavBarForRouterProps,
} from '../NavBarForRouter';

import { Browser } from '../Browser';

jest.mock('react', () => ({
  ...jest.requireActual('react'),

  useState: jest.fn().mockReturnValue([1, () => undefined]),
}));

const mockedUseState = jest.mocked(useState);

beforeEach(() => {
  mockedUseState.mockReturnValue([1, () => undefined]);
});

afterEach(() => {
  jest.clearAllMocks();
});

type PageObject = {
  getRouterNode: () => ReactElement<ComponentProps<typeof MemoryRouter>>;
  getNavBarNode: () => ReactElement<NavBarForRouterProps>;
  getChildren: () => ReactNode;
};

const setup = (props: MemoryRouterProps): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Browser
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<
  ComponentProps<typeof MemoryRouter>,
  typeof MemoryRouter
  >;

  const getRouterNode = () => result;

  const getNavBarNode = () => (result.props.children as ReactNode[])[0] as ReactElement<
  NavBarForRouterProps
  >;

  const getChildren = () => ((result.props.children as ReactNode[])[1] as ReactElement)
    .props.children as ReactNode;

  return {
    getRouterNode,
    getNavBarNode,
    getChildren,
  };
};

test('should refresh with NavBarForRouter', () => {
  const setUniq = jest.fn();

  mockedUseState.mockReturnValue([1, setUniq]);

  const page = setup({});

  const navBarNode = page.getNavBarNode();

  navBarNode.props.refresh();

  expect(setUniq).toHaveBeenCalledTimes(1);
});

test('should provide props to MemoryRouter', () => {
  const initialEntries = ['/test1/', '/test2'];

  const page = setup({
    initialEntries,
    initialIndex: 5,
  });

  const routerNode = page.getRouterNode();

  expect(routerNode.props.initialEntries).toBe(initialEntries);
  expect(routerNode.props.initialIndex).toBe(5);
});

test('should render children', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getChildren()).toBe('test');
});
