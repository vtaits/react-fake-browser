import { NavBar } from "@vtaits/react-fake-browser-ui";
import { useCallback, useContext } from "react";
import { jsx } from "react/jsx-runtime";
import {
	UNSAFE_NavigationContext,
	useLocation,
	useNavigate,
} from "react-router-dom";

/**
 * @import { HistoryType } from "./types.js"
 */

/**
 * @typedef {Object} NavBarForRouterProps
 * @property {() => void} refresh
 */

/**
 * @param {NavBarForRouterProps} props
 */
export function NavBarForRouter({ refresh }) {
	const { navigator } = useContext(UNSAFE_NavigationContext);

	const history = /** @type {HistoryType} */ (
		/** @type {unknown} */ (navigator)
	);

	const navigate = useNavigate();
	const location = useLocation();

	const goBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const goForward = useCallback(() => {
		navigate(1);
	}, [navigate]);

	const goTo = useCallback(
		/**
		 * @param {string} path
		 */
		(path) => {
			navigate(path);
		},
		[navigate],
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
