import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { NavBar } from "./NavBar.js";

/**
 * @import { ReactNode } from "react"
 */

/**
 * @typedef {Object} FakeBrowserProps
 * @property {boolean} canMoveForward
 * @property {boolean} canMoveBack
 * @property {string} currentAddress
 * @property {() => void} refresh
 * @property {() => void} goBack
 * @property {() => void} goForward
 * @property {(nextAddress: string) => void} goTo
 * @property {ReactNode} [children]
 */

/**
 * @param {FakeBrowserProps} props
 */
export function FakeBrowser({
	canMoveForward,
	canMoveBack,
	currentAddress,
	refresh,
	goBack,
	goForward,
	goTo,
	children = undefined,
}) {
	return jsxs(Fragment, {
		children: [
			jsx(NavBar, {
				canMoveForward,
				canMoveBack,
				currentAddress,
				refresh,
				goBack,
				goForward,
				goTo,
			}),
			children,
		],
	});
}
