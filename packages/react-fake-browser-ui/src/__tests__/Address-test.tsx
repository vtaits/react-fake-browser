/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import Address, {
  StyledForm,
  StyledButton,
  StyledInput,
} from '../Address';

type PageObject = {
  getFormNode: () => ShallowWrapper;
  getButtonNode: () => ShallowWrapper;
  getInputNode: () => ShallowWrapper;
};

const defaultProps = {
  currentAddress: '',
  goTo: jest.fn(),
  refresh: jest.fn(),
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper = shallow(
    <Address
      {...defaultProps}
      {...props}
    />,
  );

  const getFormNode = (): ShallowWrapper => wrapper.find(StyledForm);

  const getButtonNode = (): ShallowWrapper => wrapper.find(StyledButton);

  const getInputNode = (): ShallowWrapper => wrapper.find(StyledInput);

  return {
    getFormNode,
    getButtonNode,
    getInputNode,
  };
};

test('should take initial value from props', () => {
  const useState = jest.fn(() => ['', Function.prototype]);

  setup({
    currentAddress: 'test',
    useState,
  });

  expect(useState.mock.calls.length).toBe(1);
  expect(useState.mock.calls[0][0]).toBe('test');
});

test('should render input with value from state', () => {
  const page = setup({
    useState: () => ['test', Function.prototype],
  });

  expect(page.getInputNode().prop('value')).toBe('test');
});

test('should change local value with input', () => {
  const setValue = jest.fn();
  const useState = jest.fn(() => ['', setValue]);

  const page = setup({
    useState,
  });

  (page.getInputNode().prop('onChange') as Function)({
    target: {
      value: 'test',
    },
  });

  expect(setValue.mock.calls.length).toBe(1);
  expect(setValue.mock.calls[0][0]).toBe('test');
});

test('should not render button if current address and local value are same', () => {
  const page = setup({
    currentAddress: 'test',
    useState: () => ['test', Function.prototype],
  });

  expect(page.getButtonNode().length).toBe(0);
});

test('should render button if current address and local value are different', () => {
  const page = setup({
    currentAddress: 'test1',
    useState: () => ['test2', Function.prototype],
  });

  expect(page.getButtonNode().length).toBe(1);
});

test('should call goTo with local value on submit', () => {
  const preventDefault = jest.fn();
  const goTo = jest.fn();
  const refresh = jest.fn();

  const page = setup({
    currentAddress: 'test1',
    useState: () => ['test2', Function.prototype],
    goTo,
    refresh,
  });

  (page.getFormNode().prop('onSubmit') as Function)({
    preventDefault,
  });

  expect(preventDefault.mock.calls.length).toBe(1);

  expect(refresh.mock.calls.length).toBe(0);

  expect(goTo.mock.calls.length).toBe(1);
  expect(goTo.mock.calls[0][0]).toBe('test2');
});

test('should call refresh on submit', () => {
  const preventDefault = jest.fn();
  const goTo = jest.fn();
  const refresh = jest.fn();

  const page = setup({
    currentAddress: 'test',
    useState: () => ['test', Function.prototype],
    goTo,
    refresh,
  });

  (page.getFormNode().prop('onSubmit') as Function)({
    preventDefault,
  });

  expect(preventDefault.mock.calls.length).toBe(1);

  expect(refresh.mock.calls.length).toBe(1);

  expect(goTo.mock.calls.length).toBe(0);
});

test('should change local value on change currentAddress prop', () => {
  const setValue = jest.fn();
  const useState = jest.fn(() => ['test1', setValue]);

  setup({
    currentAddress: 'test2',
    useState,
    useEffect: (fn) => fn(),
  });

  expect(setValue.mock.calls.length).toBe(1);
  expect(setValue.mock.calls[0][0]).toBe('test2');
});
