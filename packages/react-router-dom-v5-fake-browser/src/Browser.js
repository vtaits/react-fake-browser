import { Fragment, useCallback, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { MemoryRouter } from "react-router-dom";
import { NavBarForRouter } from "./NavBarForRouter.js";

/**
 * @import { MemoryRouterProps } from "react-router-dom"
 */

/**
 * @param {number} prevValue
 */
const increase = (prevValue) => prevValue + 1;

/**
 * @param {MemoryRouterProps} props
 */
export function Browser(props) {
	const { children, ...rest } = props;

	const [uniq, setUniq] = useState(1);

	const refresh = useCallback(() => {
		setUniq(increase);
	}, []);

	return jsxs(MemoryRouter, {
		...rest,
		children: [
			jsx(NavBarForRouter, {
				refresh,
			}),

			jsx(
				Fragment,
				{
					children,
				},
				uniq,
			),
		],
	});
}
