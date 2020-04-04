/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React, { FC } from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import NavBar from '../NavBar';

import FakeBrowser from '../FakeBrowser';

type PageObject = {
  getNavBarNode: () => ShallowWrapper;
  wrapper: ShallowWrapper;
};

const defaultProps = {
  canMoveForward: false,
  canMoveBack: false,
  currentAddress: '',
  refresh: Function.prototype,
  goBack: Function.prototype,
  goForward: Function.prototype,
  goTo: Function.prototype,
  children: <div />,
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper = shallow(
    <FakeBrowser
      {...defaultProps}
      {...props}
    />,
  );

  const getNavBarNode = (): ShallowWrapper => wrapper.find(NavBar);

  return {
    getNavBarNode,
    wrapper,
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

  expect(navBarNode.prop('canMoveForward')).toBe(true);
  expect(navBarNode.prop('canMoveBack')).toBe(true);
  expect(navBarNode.prop('currentAddress')).toBe('/test/');
  expect(navBarNode.prop('refresh')).toBe(refresh);
  expect(navBarNode.prop('goBack')).toBe(goBack);
  expect(navBarNode.prop('goForward')).toBe(goForward);
  expect(navBarNode.prop('goTo')).toBe(goTo);
});

test('should render children', () => {
  const Test: FC = () => <span />;

  const page = setup({
    children: <Test />,
  });

  const testNode = page.wrapper.find(Test);

  expect(testNode.length).toBe(1);
});
