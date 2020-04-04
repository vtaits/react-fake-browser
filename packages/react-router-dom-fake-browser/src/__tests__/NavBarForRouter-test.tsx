/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';
import {
  NavBar,
} from '@vtaits/react-fake-browser-ui';

import NavBarForRouter from '../NavBarForRouter';

type PageObject = {
  getNavBarNode: () => ShallowWrapper;
};

type FakeHistory = {
  index: number;
  length: number;
  goBack: () => void;
  goForward: () => void;
  push: (nextPath: string) => void;
};

type FakeLocation = {
  pathname: string;
  search?: string;
};

const defaultProps = {
  refresh: (): void => {},

  useHistory: (): FakeHistory => ({
    index: 0,
    length: 1,
    goBack: (): void => {},
    goForward: (): void => {},
    push: (): void => {},
  }),

  useLocation: (): FakeLocation => ({
    pathname: '/',
    search: '',
  }),
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper = shallow(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    <NavBarForRouter
      {...defaultProps}
      {...props}
    />,
  );

  const getNavBarNode = (): ShallowWrapper => wrapper.find(NavBar);

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

  (navBarNode.prop('goBack') as Function)();

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

  (navBarNode.prop('goForward') as Function)();

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

  (navBarNode.prop('goTo') as Function)('/test/');

  expect(push.mock.calls.length).toBe(1);
  expect(push.mock.calls[0][0]).toBe('/test/');
});
