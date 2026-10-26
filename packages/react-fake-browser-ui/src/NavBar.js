import { definition as faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { definition as faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { definition as faRedo } from "@fortawesome/free-solid-svg-icons/faRedo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jsx, jsxs } from "react/jsx-runtime";
import { Address } from "./Address.js";

/**
 * @typedef {Object} NavBarProps
 * @property {boolean} canMoveForward
 * @property {boolean} canMoveBack
 * @property {string} currentAddress
 * @property {() => void} refresh
 * @property {() => void} goBack
 * @property {() => void} goForward
 * @property {(nextAddress: string) => void} goTo
 */

/**
 * @param {NavBarProps} props
 */
export function NavBar({
	canMoveForward,
	canMoveBack,
	currentAddress,
	refresh,
	goBack,
	goForward,
	goTo,
}) {
	return jsxs("div", {
		className: "fake-browser__nav-bar",
		children: [
			jsx("button", {
				type: "button",
				className: "fake-browser__nav-bar-button",
				"aria-label": "Go back",
				onClick: goBack,
				disabled: !canMoveBack,
				children: jsx(FontAwesomeIcon, {
					icon: faArrowLeft,
				}),
			}),

			jsx("button", {
				type: "button",
				className: "fake-browser__nav-bar-button",
				"aria-label": "Go forward",
				onClick: goForward,
				disabled: !canMoveForward,
				children: jsx(FontAwesomeIcon, {
					icon: faArrowRight,
				}),
			}),

			jsx("button", {
				type: "button",
				className: "fake-browser__nav-bar-button",
				"aria-label": "Refresh",
				onClick: refresh,
				children: jsx(FontAwesomeIcon, {
					icon: faRedo,
				}),
			}),

			jsx(Address, {
				currentAddress,
				goTo,
				refresh,
			}),
		],
	});
}
