import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { FakeBrowser } from "./index.js";

/**
 * @import { FakeBrowserProps } from "./FakeBrowser.js"
 */

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

/** @type {FakeBrowserProps} */
const defaultProps = {
	canMoveForward: false,
	canMoveBack: false,
	currentAddress: "",
	refresh: () => undefined,
	goBack: () => undefined,
	goForward: () => undefined,
	goTo: () => undefined,
};

describe("back button", () => {
	test("disabled", () => {
		render(<FakeBrowser {...defaultProps} canMoveBack={false} />);

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			true,
		);
	});

	test("enabled", () => {
		const goBack = vi.fn();

		render(<FakeBrowser {...defaultProps} canMoveBack goBack={goBack} />);

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Go back" }));
		});

		expect(goBack).toHaveBeenCalledTimes(1);
	});
});

describe("forward button", () => {
	test("disabled", () => {
		render(<FakeBrowser {...defaultProps} canMoveForward={false} />);

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			true,
		);
	});

	test("enabled", () => {
		const goForward = vi.fn();

		render(
			<FakeBrowser {...defaultProps} canMoveForward goForward={goForward} />,
		);

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Go forward" }));
		});

		expect(goForward).toHaveBeenCalledTimes(1);
	});
});

describe("refresh button", () => {
	test("handle refresh", () => {
		const refresh = vi.fn();

		render(<FakeBrowser {...defaultProps} refresh={refresh} />);

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
		});

		expect(refresh).toHaveBeenCalledTimes(1);
	});
});

describe("address bar", () => {
	test("sync address with props", () => {
		const { rerender } = render(
			<FakeBrowser
				{...defaultProps}
				currentAddress="/foo"
				refresh={() => {}}
				goTo={() => {}}
			/>,
		);

		expect(screen.getByRole("textbox")).toHaveProperty("value", "/foo");

		rerender(
			<FakeBrowser
				{...defaultProps}
				currentAddress="/bar"
				refresh={() => {}}
				goTo={() => {}}
			/>,
		);

		expect(screen.getByRole("textbox")).toHaveProperty("value", "/bar");
	});

	test("go to next page", () => {
		const goTo = vi.fn();
		const refresh = vi.fn();

		render(
			<FakeBrowser
				{...defaultProps}
				currentAddress="/foo"
				refresh={refresh}
				goTo={goTo}
			/>,
		);

		act(() => {
			fireEvent.change(screen.getByRole("textbox"), {
				target: {
					value: "/bar",
				},
			});
		});

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Navigate" }));
		});

		expect(goTo).toHaveBeenCalledTimes(1);
		expect(goTo).toHaveBeenCalledWith("/bar");

		expect(refresh).toHaveBeenCalledTimes(0);
	});
});

describe("children", () => {
	test("render children", () => {
		render(
			<FakeBrowser {...defaultProps}>
				<div data-testid="child" />
			</FakeBrowser>,
		);

		screen.getByTestId("child");
	});
});
