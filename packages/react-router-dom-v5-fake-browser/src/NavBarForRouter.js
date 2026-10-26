import { NavBar } from "@vtaits/react-fake-browser-ui";
import { useCallback } from "react";
import { jsx } from "react/jsx-runtime";
import { useHistory, useLocation } from "react-router-dom";

/**
 * @typedef {Object} NavBarForRouterProps
 * @property {() => void} refresh
 */

/**
 * @param {NavBarForRouterProps} props
 */
export function NavBarForRouter({ refresh }) {
	const history = useHistory();
	const location = useLocation();

	const goBack = useCallback(() => {
		history.goBack();
	}, [history]);

	const goForward = useCallback(() => {
		history.goForward();
	}, [history]);

	const goTo = useCallback(
		/**
		 * @param {string} path
		 */
		(path) => {
			history.push(path);
		},
		[history],
	);

	const historyIndex = /** @type {{
			index: number;
		}} */ (/** @type {unknown} */ (history)).index;

	return jsx(NavBar, {
		canMoveForward: historyIndex < history.length - 1,
		canMoveBack: historyIndex > 0,
		currentAddress: `${location.pathname}${location.search}`,
		refresh,
		goBack,
		goForward,
		goTo,
	});
}
