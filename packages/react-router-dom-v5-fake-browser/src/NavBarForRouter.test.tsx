import { NavBar } from "@vtaits/react-fake-browser-ui";
import type { History, Location } from "history";
import type { ComponentProps, ReactElement } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { createRenderer } from "react-test-renderer/shallow";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { NavBarForRouter } from "./NavBarForRouter";
import type { NavBarForRouterProps } from "./NavBarForRouter";

vi.mock("react-router-dom");

const mockedUseHistory = vi.mocked(useHistory);
const mockedUseLocation = vi.mocked(useLocation);

beforeEach(() => {
	mockedUseHistory.mockReturnValue({
		index: 0,
		length: 1,
		goBack: () => undefined,
		goForward: () => undefined,
		push: () => undefined,
	} as unknown as History<unknown>);

	mockedUseLocation.mockReturnValue({
		pathname: "/",
		search: "",
	} as unknown as Location<unknown>);
});

afterEach(() => {
	vi.clearAllMocks();
});

type PageObject = {
	getNavBarNode: () => ReactElement<
		ComponentProps<typeof NavBar>,
		typeof NavBar
	>;
};

const defaultProps: NavBarForRouterProps = {
	refresh: () => undefined,
};

const setup = (props: Partial<NavBarForRouterProps>): PageObject => {
	const renderer = createRenderer();

	renderer.render(<NavBarForRouter {...defaultProps} {...props} />);

	const result = renderer.getRenderOutput() as ReactElement<
		ComponentProps<typeof NavBar>,
		typeof NavBar
	>;

	const getNavBarNode = () => result;

	return {
		getNavBarNode,
	};
};

test("should provide props to NavBar", () => {
	const refresh = vi.fn();
	const goBack = vi.fn();
	const goForward = vi.fn();
	const push = vi.fn();

	mockedUseHistory.mockReturnValue({
		index: 0,
		length: 1,
		goBack,
		goForward,
		push,
	} as unknown as History<unknown>);

	mockedUseLocation.mockReturnValue({
		pathname: "/test/",
		search: "?123",
	} as unknown as Location<unknown>);

	const page = setup({
		refresh,
	});

	const navBarNode = page.getNavBarNode();

	expect(navBarNode.props.canMoveForward).toBe(false);
	expect(navBarNode.props.canMoveBack).toBe(false);
	expect(navBarNode.props.currentAddress).toBe("/test/?123");
	expect(navBarNode.props.refresh).toBe(refresh);
});

test("should provide truthy canMoveForward to NavBar", () => {
	const goBack = vi.fn();
	const goForward = vi.fn();
	const push = vi.fn();

	mockedUseHistory.mockReturnValue({
		index: 2,
		length: 5,
		goBack,
		goForward,
		push,
	} as unknown as History<unknown>);

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	expect(navBarNode.props.canMoveForward).toBe(true);
});

test("should provide truthy canMoveBack to NavBar", () => {
	const goBack = vi.fn();
	const goForward = vi.fn();
	const push = vi.fn();

	mockedUseHistory.mockReturnValue({
		index: 2,
		length: 5,
		goBack,
		goForward,
		push,
	} as unknown as History<unknown>);

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	expect(navBarNode.props.canMoveBack).toBe(true);
});

test("should call goBack", () => {
	const goBack = vi.fn();
	const goForward = vi.fn();
	const push = vi.fn();

	mockedUseHistory.mockReturnValue({
		index: 2,
		length: 5,
		goBack,
		goForward,
		push,
	} as unknown as History<unknown>);

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	navBarNode.props.goBack();

	expect(goBack).toHaveBeenCalledTimes(1);
});

test("should call goForward", () => {
	const goBack = vi.fn();
	const goForward = vi.fn();
	const push = vi.fn();

	mockedUseHistory.mockReturnValue({
		index: 2,
		length: 5,
		goBack,
		goForward,
		push,
	} as unknown as History<unknown>);

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	navBarNode.props.goForward();

	expect(goForward).toHaveBeenCalledTimes(1);
});

test("should call goTo", () => {
	const goBack = vi.fn();
	const goForward = vi.fn();
	const push = vi.fn();

	mockedUseHistory.mockReturnValue({
		index: 2,
		length: 5,
		goBack,
		goForward,
		push,
	} as unknown as History<unknown>);

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	navBarNode.props.goTo("/test/");

	expect(push).toHaveBeenCalledTimes(1);
	expect(push).toHaveBeenCalledWith("/test/");
});
