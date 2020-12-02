/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  ComponentProps,
  FC,
} from 'react';
import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';
import {
  MemoryRouter,
} from 'react-router-dom';

import NavBarForRouter from '../NavBarForRouter';

import Browser from '../Browser';

type PageObject = {
  getRouterNode: () => ShallowWrapper<ComponentProps<typeof MemoryRouter>>;
  getNavBarNode: () => ShallowWrapper<ComponentProps<typeof NavBarForRouter>>;
  wrapper: ShallowWrapper;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper = shallow(
    <Browser
      {...props}
    />,
  );

  const getRouterNode = (): ShallowWrapper<ComponentProps<typeof MemoryRouter>> => wrapper
    .find(MemoryRouter);

  const getNavBarNode = (): ShallowWrapper<ComponentProps<typeof NavBarForRouter>> => wrapper
    .find(NavBarForRouter);

  return {
    getRouterNode,
    getNavBarNode,
    wrapper,
  };
};

test('should refresh with NavBarForRouter', () => {
  const setUniq = jest.fn();

  const page = setup({
    useState: () => [1, setUniq],
  });

  const navBarNode = page.getNavBarNode();

  navBarNode.prop('refresh')();

  expect(setUniq.mock.calls.length).toBe(1);
});

test('should provide props to MemoryRouter', () => {
  const initialEntries = ['/test1/', '/test2'];

  const page = setup({
    initialEntries,
    initialIndex: 5,
  });

  const routerNode = page.getRouterNode();

  expect(routerNode.prop('initialEntries')).toBe(initialEntries);
  expect(routerNode.prop('initialIndex')).toBe(5);
});

test('should render children', () => {
  const Test: FC = () => <span />;

  const page = setup({
    children: <Test />,
  });

  expect(page.wrapper.find(Test).length).toBe(1);
});
