/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  ComponentProps,
} from 'react';
import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';
import {
  useHistory as defaultUseHistory,
  useLocation as defaultUseLocation,
} from 'react-router-dom';
import {
  NavBar,
} from '@vtaits/react-fake-browser-ui';

import NavBarForRouter from '../NavBarForRouter';

type PageObject = {
  getNavBarNode: () => ShallowWrapper<ComponentProps<typeof NavBar>>;
};

type FakeLocation = {
  pathname: string;
  search?: string;
};

const defaultProps = {
  refresh: (): void => {},

  useHistory: (() => ({
    index: 0,
    length: 1,
    goBack: (): void => {},
    goForward: (): void => {},
    push: (): void => {},
  })) as unknown as typeof defaultUseHistory,

  useLocation: ((): FakeLocation => ({
    pathname: '/',
    search: '',
  })) as unknown as typeof defaultUseLocation,
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper = shallow(
    <NavBarForRouter
      {...defaultProps}
      {...props}
    />,
  );

  const getNavBarNode = (): ShallowWrapper<ComponentProps<typeof NavBar>> => wrapper.find(NavBar);

  return {
    getNavBarNode,
  };
};

test('should provide props to NavBar', () => {
  const refresh = jest.fn();
  const goBack = jest.fn();
  const goForward = jest.fn();
  const push = jest.fn();

  const page = setup({
    refresh,
    useHistory: () => ({
      index: 0,
      length: 1,
      goBack,
      goForward,
      push,
    }),
    useLocation: () => ({
      pathname: '/test/',
      search: '?123',
    }),
  });

  const navBarNode = page.getNavBarNode();

  expect(navBarNode.prop('canMoveForward')).toBe(false);
  expect(navBarNode.prop('canMoveBack')).toBe(false);
  expect(navBarNode.prop('currentAddress')).toBe('/test/?123');
  expect(navBarNode.prop('refresh')).toBe(refresh);
});

test('should provide truthy canMoveForward to NavBar', () => {
  const goBack = jest.fn();
  const goForward = jest.fn();
  const push = jest.fn();

  const page = setup({
    useHistory: () => ({
      index: 2,
      length: 5,
      goBack,
      goForward,
      push,
    }),
  });

  const navBarNode = page.getNavBarNode();

  expect(navBarNode.prop('canMoveForward')).toBe(true);
});

test('should provide truthy canMoveBack to NavBar', () => {
  const goBack = jest.fn();
  const goForward = jest.fn();
  const push = jest.fn();

  const page = setup({
    useHistory: () => ({
      index: 2,
      length: 5,
      goBack,
      goForward,
      push,
    }),
  });

  const navBarNode = page.getNavBarNode();

  expect(navBarNode.prop('canMoveBack')).toBe(true);
});

test('should call goBack', () => {
  const goBack = jest.fn();
  const goForward = jest.fn();
  const push = jest.fn();

  const page = setup({
    useHistory: () => ({
      index: 2,
      length: 5,
      goBack,
      goForward,
      push,
    }),
  });

  const navBarNode = page.getNavBarNode();

  navBarNode.prop('goBack')();

  expect(goBack.mock.calls.length).toBe(1);
});

test('should call goForward', () => {
  const goBack = jest.fn();
  const goForward = jest.fn();
  const push = jest.fn();

  const page = setup({
    useHistory: () => ({
      index: 2,
      length: 5,
      goBack,
      goForward,
      push,
    }),
  });

  const navBarNode = page.getNavBarNode();

  navBarNode.prop('goForward')();

  expect(goForward.mock.calls.length).toBe(1);
});

test('should call goTo', () => {
  const goBack = jest.fn();
  const goForward = jest.fn();
  const push = jest.fn();

  const page = setup({
    useHistory: () => ({
      index: 2,
      length: 5,
      goBack,
      goForward,
      push,
    }),
  });

  const navBarNode = page.getNavBarNode();

  navBarNode.prop('goTo')('/test/');

  expect(push.mock.calls.length).toBe(1);
  expect(push.mock.calls[0][0]).toBe('/test/');
});
