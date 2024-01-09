import { NavBar } from "@vtaits/react-fake-browser-ui";
import { useContext } from "react";
import type { ComponentProps, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { createRenderer } from "react-test-renderer/shallow";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { NavBarForRouter } from "./NavBarForRouter";
import type { NavBarForRouterProps } from "./NavBarForRouter";

const navigate = vi.fn();

vi.mock("react", async () => {
	const actual = (await vi.importActual("react")) as Record<string, unknown>;

	return {
		...actual,
		useContext: vi.fn().mockReturnValue({
			navigator: {
				index: 0,
				length: 0,
			},
		}),
	};
});

vi.mock("react-router-dom");

const mockedUseContext = vi.mocked(useContext);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseLocation = vi.mocked(useLocation);

beforeEach(() => {
	mockedUseContext.mockReturnValue({
		navigator: {
			index: 0,
			length: 0,
		},
	});

	mockedUseNavigate.mockReturnValue(navigate);

	mockedUseLocation.mockReturnValue({
		pathname: "/",
		search: "",
	} as unknown as Location);
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

	mockedUseContext.mockReturnValue({
		navigator: {
			index: 0,
			length: 1,
		},
	});

	mockedUseLocation.mockReturnValue({
		pathname: "/test/",
		search: "?123",
	} as unknown as Location);

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
	mockedUseContext.mockReturnValue({
		navigator: {
			index: 2,
			length: 5,
		},
	});

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	expect(navBarNode.props.canMoveForward).toBe(true);
});

test("should provide truthy canMoveBack to NavBar", () => {
	mockedUseContext.mockReturnValue({
		navigator: {
			index: 2,
			length: 5,
		},
	});

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	expect(navBarNode.props.canMoveBack).toBe(true);
});

test("should call goBack", () => {
	mockedUseContext.mockReturnValue({
		navigator: {
			index: 2,
			length: 5,
		},
	});

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	navBarNode.props.goBack();

	expect(navigate).toHaveBeenCalledTimes(1);
	expect(navigate).toHaveBeenCalledWith(-1);
});

test("should call goForward", () => {
	mockedUseContext.mockReturnValue({
		navigator: {
			index: 2,
			length: 5,
		},
	});

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	navBarNode.props.goForward();

	expect(navigate).toHaveBeenCalledTimes(1);
	expect(navigate).toHaveBeenCalledWith(1);
});

test("should call goTo", () => {
	mockedUseContext.mockReturnValue({
		navigator: {
			index: 2,
			length: 5,
		},
	});

	const page = setup({});

	const navBarNode = page.getNavBarNode();

	navBarNode.props.goTo("/test/");

	expect(navigate).toHaveBeenCalledTimes(1);
	expect(navigate).toHaveBeenCalledWith("/test/");
});
