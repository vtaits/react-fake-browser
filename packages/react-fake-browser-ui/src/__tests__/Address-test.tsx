import { useEffect, useState } from "react";
import type {
	ChangeEvent,
	HTMLProps,
	ReactElement,
	ReactNode,
	SyntheticEvent,
} from "react";

import { createRenderer } from "react-test-renderer/shallow";

import useLatest from "use-latest";

import { Address } from "../Address";
import type { AddressProps } from "../Address";

jest.mock("react", () => ({
	...jest.requireActual("react"),

	useState: jest.fn().mockReturnValue(["", () => undefined]),

	useEffect: jest.fn(),
}));

jest.mock("use-latest");

const mockedUseState = jest.mocked(useState);
const mockedUseEffect = jest.mocked(useEffect);
const mockedUseLatest = jest.mocked(useLatest);

beforeEach(() => {
	mockedUseState.mockReturnValue(["", () => undefined]);

	mockedUseLatest
		.mockReturnValueOnce({
			current: "",
		})
		.mockReturnValueOnce({
			current: true,
		});
});

afterEach(() => {
	jest.clearAllMocks();
});

type PageObject = {
	getFormNode: () => ReactElement<{
		onSubmit: (event: SyntheticEvent) => void;
	}>;
	getButtonNode: () => ReactNode | null;
	getInputNode: () => ReactElement<HTMLProps<HTMLInputElement>>;
};

const defaultProps: AddressProps = {
	currentAddress: "",
	goTo: jest.fn(),
	refresh: jest.fn(),
};

const setup = (props: Partial<AddressProps>): PageObject => {
	const renderer = createRenderer();

	renderer.render(<Address {...defaultProps} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<{
		onSubmit: (event: SyntheticEvent) => void;
		children: ReactNode[];
	}>;

	const getFormNode = () => result;

	const getButtonNode = () => result.props.children[1] as ReactNode | null;

	const getInputNode = () =>
		result.props.children[0] as ReactElement<HTMLProps<HTMLInputElement>>;

	return {
		getFormNode,
		getButtonNode,
		getInputNode,
	};
};

test("should take initial value from props", () => {
	mockedUseState.mockReturnValue(["test", () => undefined]);

	setup({
		currentAddress: "test",
	});

	expect(useState).toHaveBeenCalledTimes(1);
	expect(useState).toHaveBeenCalledWith("test");
});

test("should render input with value from state", () => {
	mockedUseState.mockReturnValue(["test", () => undefined]);

	const page = setup({});

	expect(page.getInputNode().props.value).toBe("test");
});

test("should change local value with input", () => {
	const setValue = jest.fn();
	mockedUseState.mockReturnValue(["", setValue]);

	const page = setup({});

	const { onChange } = page.getInputNode().props;

	if (!onChange) {
		throw new Error("onChange should be defined");
	}

	onChange({
		target: {
			value: "test",
		},
	} as unknown as ChangeEvent<HTMLInputElement>);

	expect(setValue).toHaveBeenCalledTimes(1);
	expect(setValue).toHaveBeenCalledWith("test");
});

test("should not render button if current address and local value are same", () => {
	mockedUseState.mockReturnValue(["test", () => undefined]);

	const page = setup({
		currentAddress: "test",
	});

	expect(page.getButtonNode()).toBeFalsy();
});

test("should render button if current address and local value are different", () => {
	mockedUseState.mockReturnValue(["test2", () => undefined]);

	const page = setup({
		currentAddress: "test1",
	});

	expect(page.getButtonNode()).toBeTruthy();
});

test("should set address to first `useLatest` ref", () => {
	mockedUseState.mockReturnValue(["test", () => undefined]);

	setup({});

	expect(useLatest).toHaveBeenCalledTimes(2);
	expect(useLatest).toHaveBeenNthCalledWith(1, "test");
});

test("should set equal addresses to second `useLatest` ref", () => {
	mockedUseState.mockReturnValue(["test", () => undefined]);

	setup({
		currentAddress: "test",
	});

	expect(useLatest).toHaveBeenCalledTimes(2);
	expect(useLatest).toHaveBeenNthCalledWith(2, true);
});

test("should set not equal addresses to second `useLatest` ref", () => {
	mockedUseState.mockReturnValue(["test1", () => undefined]);

	setup({
		currentAddress: "test2",
	});

	expect(useLatest).toHaveBeenCalledTimes(2);
	expect(useLatest).toHaveBeenNthCalledWith(2, false);
});

test("should call goTo with local value on submit", () => {
	const preventDefault = jest.fn();
	const goTo = jest.fn();
	const refresh = jest.fn();

	mockedUseLatest.mockReset();
	mockedUseLatest
		.mockReturnValueOnce({
			current: "test",
		})
		.mockReturnValueOnce({
			current: false,
		});

	const page = setup({
		goTo,
		refresh,
	});

	page.getFormNode().props.onSubmit({
		preventDefault,
	} as unknown as SyntheticEvent);

	expect(preventDefault).toHaveBeenCalledTimes(1);

	expect(refresh).toHaveBeenCalledTimes(0);

	expect(goTo).toHaveBeenCalledTimes(1);
	expect(goTo).toHaveBeenCalledWith("test");
});

test("should call refresh on submit", () => {
	const preventDefault = jest.fn();
	const goTo = jest.fn();
	const refresh = jest.fn();

	mockedUseLatest.mockReset();
	mockedUseLatest
		.mockReturnValueOnce({
			current: "",
		})
		.mockReturnValueOnce({
			current: true,
		});

	const page = setup({
		goTo,
		refresh,
	});

	page.getFormNode().props.onSubmit({
		preventDefault,
	} as unknown as SyntheticEvent);

	expect(preventDefault).toHaveBeenCalledTimes(1);
	expect(refresh).toHaveBeenCalledTimes(1);
	expect(goTo).toHaveBeenCalledTimes(0);
});

test("should change local value on change currentAddress prop", () => {
	const setValue = jest.fn();
	mockedUseState.mockReturnValue(["test1", setValue]);

	setup({
		currentAddress: "test2",
	});

	expect(mockedUseEffect).toHaveBeenCalledTimes(1);
	mockedUseEffect.mock.calls[0][0]();

	expect(setValue).toHaveBeenCalledTimes(1);
	expect(setValue).toHaveBeenCalledWith("test2");
});
