import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Browser } from "./index.js";

function TestComponent() {
	const { pathname } = useLocation();

	return <div data-testid="pathname">{pathname}</div>;
}

afterEach(() => {
	vi.clearAllMocks();
	cleanup();
});

describe("render initial state", () => {
	test("default state", () => {
		render(
			<Browser>
				<TestComponent />
			</Browser>,
		);

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			true,
		);
		expect(screen.getByRole("button", { name: "Go forward" })).toHaveProperty(
			"disabled",
			true,
		);
		expect(screen.getByRole("textbox")).toHaveProperty("value", "/");
		expect(screen.getByTestId("pathname")).toHaveProperty("textContent", "/");
	});

	test("first entry of history", () => {
		render(
			<Browser initialIndex={0} initialEntries={["/foo", "/bar"]}>
				<TestComponent />
			</Browser>,
		);

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			true,
		);
		// expect(screen.getByRole('button', { name: 'Go forward'})).toHaveProperty('disabled', false);
		expect(screen.getByRole("textbox")).toHaveProperty("value", "/foo");
		expect(screen.getByTestId("pathname")).toHaveProperty(
			"textContent",
			"/foo",
		);
	});

	test("last entry of history", () => {
		render(
			<Browser initialIndex={1} initialEntries={["/foo", "/bar"]}>
				<TestComponent />
			</Browser>,
		);

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			false,
		);
		expect(screen.getByRole("button", { name: "Go forward" })).toHaveProperty(
			"disabled",
			true,
		);
		expect(screen.getByRole("textbox")).toHaveProperty("value", "/bar");
		expect(screen.getByTestId("pathname")).toHaveProperty(
			"textContent",
			"/bar",
		);
	});
});

describe("navigation", () => {
	test("navigate with address bar and buttons", () => {
		render(
			<Browser initialIndex={0} initialEntries={["/foo", "/bar"]}>
				<TestComponent />
			</Browser>,
		);

		act(() => {
			fireEvent.change(screen.getByRole("textbox"), {
				target: {
					value: "/baz",
				},
			});
		});

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Navigate" }));
		});

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			false,
		);
		expect(screen.getByRole("button", { name: "Go forward" })).toHaveProperty(
			"disabled",
			true,
		);
		expect(screen.getByRole("textbox")).toHaveProperty("value", "/baz");
		expect(screen.getByTestId("pathname")).toHaveProperty(
			"textContent",
			"/baz",
		);

		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Go back" }));
		});

		expect(screen.getByRole("button", { name: "Go back" })).toHaveProperty(
			"disabled",
			true,
		);
		// expect(screen.getByRole('button', { name: 'Go forward'})).toHaveProperty('disabled', false);
		expect(screen.getByRole("textbox")).toHaveProperty("value", "/foo");
		expect(screen.getByTestId("pathname")).toHaveProperty(
			"textContent",
			"/foo",
		);
	});
});
