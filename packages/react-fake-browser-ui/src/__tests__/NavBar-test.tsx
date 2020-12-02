/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';

import Button from '../Button';
import Address from '../Address';

import NavBar from '../NavBar';

type PageObject = {
  getAddressNode: () => ShallowWrapper;
  getBackButtonNode: () => ShallowWrapper;
  getForwardButtonNode: () => ShallowWrapper;
  getRefreshButtonNode: () => ShallowWrapper;
};

const defaultProps = {
  canMoveForward: false,
  canMoveBack: false,
  currentAddress: '',
  refresh: Function.prototype,
  goBack: Function.prototype,
  goForward: Function.prototype,
  goTo: Function.prototype,
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper = shallow(
    <NavBar
      {...defaultProps}
      {...props}
    />,
  );

  const getAddressNode = (): ShallowWrapper => wrapper.find(Address);

  const getBackButtonNode = (): ShallowWrapper => wrapper.find(Button).at(0);

  const getForwardButtonNode = (): ShallowWrapper => wrapper.find(Button).at(1);

  const getRefreshButtonNode = (): ShallowWrapper => wrapper.find(Button).at(2);

  return {
    getAddressNode,
    getBackButtonNode,
    getForwardButtonNode,
    getRefreshButtonNode,
  };
};

test('should provide props to Address', () => {
  const refresh = jest.fn();
  const goTo = jest.fn();

  const page = setup({
    currentAddress: '/test/',
    refresh,
    goTo,
  });

  const addressNode = page.getAddressNode();

  expect(addressNode.prop('refresh')).toBe(refresh);
  expect(addressNode.prop('goTo')).toBe(goTo);
  expect(addressNode.prop('currentAddress')).toBe('/test/');
});

test('should provide props to refresh button', () => {
  const refresh = jest.fn();

  const page = setup({
    refresh,
  });

  const refreshButtonNode = page.getRefreshButtonNode();

  expect(refreshButtonNode.prop('onClick')).toBe(refresh);
});

test('should render disabled back button', () => {
  const goBack = jest.fn();

  const page = setup({
    canMoveBack: false,
    goBack,
  });

  const backButtonNode = page.getBackButtonNode();

  expect(backButtonNode.prop('disabled')).toBe(true);
  expect(backButtonNode.prop('onClick')).toBe(goBack);
});

test('should render enabled back button', () => {
  const goBack = jest.fn();

  const page = setup({
    canMoveBack: true,
    goBack,
  });

  const backButtonNode = page.getBackButtonNode();

  expect(backButtonNode.prop('disabled')).toBe(false);
  expect(backButtonNode.prop('onClick')).toBe(goBack);
});

test('should render disabled forward button', () => {
  const goForward = jest.fn();

  const page = setup({
    canMoveForward: false,
    goForward,
  });

  const forwardButtonNode = page.getForwardButtonNode();

  expect(forwardButtonNode.prop('disabled')).toBe(true);
  expect(forwardButtonNode.prop('onClick')).toBe(goForward);
});

test('should render enabled forward button', () => {
  const goForward = jest.fn();

  const page = setup({
    canMoveForward: true,
    goForward,
  });

  const forwardButtonNode = page.getForwardButtonNode();

  expect(forwardButtonNode.prop('disabled')).toBe(false);
  expect(forwardButtonNode.prop('onClick')).toBe(goForward);
});
