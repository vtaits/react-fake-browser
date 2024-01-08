import { NavBar } from "@vtaits/react-fake-browser-ui";
import { useContext } from "react";
import type { ComponentProps, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { createRenderer } from "react-test-renderer/shallow";
import { NavBarForRouter } from "../NavBarForRouter";
import type { NavBarForRouterProps } from "../NavBarForRouter";

const navigate = jest.fn();

jest.mock("react", () => ({
	...jest.requireActual("react"),

	useContext: jest.fn().mockReturnValue({
		navigator: {
			index: 0,
			length: 0,
		},
	}),
}));

jest.mock("react-router-dom", () => ({
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
}));

const mockedUseContext = jest.mocked(useContext);
const mockedUseNavigate = jest.mocked(useNavigate);
const mockedUseLocation = jest.mocked(useLocation);

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
	jest.clearAllMocks();
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
	const refresh = jest.fn();

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
