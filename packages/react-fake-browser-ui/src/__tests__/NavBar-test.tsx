import type { ReactElement, ReactNode } from "react";
import { createRenderer } from "react-test-renderer/shallow";
import type { AddressProps } from "../Address";
import { NavBar } from "../NavBar";
import type { NavBarProps } from "../NavBar";

type ButtonProps = {
	disabled?: boolean;
	onClick: () => void;
};

type PageObject = {
	getAddressNode: () => ReactElement<AddressProps>;
	getBackButtonNode: () => ReactElement<ButtonProps>;
	getForwardButtonNode: () => ReactElement<ButtonProps>;
	getRefreshButtonNode: () => ReactElement<ButtonProps>;
};

const defaultProps: NavBarProps = {
	canMoveForward: false,
	canMoveBack: false,
	currentAddress: "",
	refresh: () => undefined,
	goBack: () => undefined,
	goForward: () => undefined,
	goTo: () => undefined,
};

const setup = (props: Partial<NavBarProps>): PageObject => {
	const renderer = createRenderer();

	renderer.render(<NavBar {...defaultProps} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<{
		children: ReactNode[];
	}>;

	const getAddressNode = () =>
		result.props.children[3] as ReactElement<AddressProps>;

	const getBackButtonNode = () =>
		result.props.children[0] as ReactElement<ButtonProps>;

	const getForwardButtonNode = () =>
		result.props.children[1] as ReactElement<ButtonProps>;

	const getRefreshButtonNode = () =>
		result.props.children[2] as ReactElement<ButtonProps>;

	return {
		getAddressNode,
		getBackButtonNode,
		getForwardButtonNode,
		getRefreshButtonNode,
	};
};

test("should provide props to Address", () => {
	const refresh = jest.fn();
	const goTo = jest.fn();

	const page = setup({
		currentAddress: "/test/",
		refresh,
		goTo,
	});

	const addressNode = page.getAddressNode();

	expect(addressNode.props.refresh).toBe(refresh);
	expect(addressNode.props.goTo).toBe(goTo);
	expect(addressNode.props.currentAddress).toBe("/test/");
});

test("should provide props to refresh button", () => {
	const refresh = jest.fn();

	const page = setup({
		refresh,
	});

	const refreshButtonNode = page.getRefreshButtonNode();

	expect(refreshButtonNode.props.onClick).toBe(refresh);
});

test("should render disabled back button", () => {
	const goBack = jest.fn();

	const page = setup({
		canMoveBack: false,
		goBack,
	});

	const backButtonNode = page.getBackButtonNode();

	expect(backButtonNode.props.disabled).toBe(true);
	expect(backButtonNode.props.onClick).toBe(goBack);
});

test("should render enabled back button", () => {
	const goBack = jest.fn();

	const page = setup({
		canMoveBack: true,
		goBack,
	});

	const backButtonNode = page.getBackButtonNode();

	expect(backButtonNode.props.disabled).toBe(false);
	expect(backButtonNode.props.onClick).toBe(goBack);
});

test("should render disabled forward button", () => {
	const goForward = jest.fn();

	const page = setup({
		canMoveForward: false,
		goForward,
	});

	const forwardButtonNode = page.getForwardButtonNode();

	expect(forwardButtonNode.props.disabled).toBe(true);
	expect(forwardButtonNode.props.onClick).toBe(goForward);
});

test("should render enabled forward button", () => {
	const goForward = jest.fn();

	const page = setup({
		canMoveForward: true,
		goForward,
	});

	const forwardButtonNode = page.getForwardButtonNode();

	expect(forwardButtonNode.props.disabled).toBe(false);
	expect(forwardButtonNode.props.onClick).toBe(goForward);
});
