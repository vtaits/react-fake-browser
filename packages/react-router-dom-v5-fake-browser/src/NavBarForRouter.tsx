import { NavBar } from "@vtaits/react-fake-browser-ui";
import type { ReactElement } from "react";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

export type NavBarForRouterProps = {
	refresh: () => void;
};

export function NavBarForRouter({
	refresh,
}: NavBarForRouterProps): ReactElement {
	const history = useHistory();
	const location = useLocation();

	const goBack = useCallback(() => {
		history.goBack();
	}, [history]);

	const goForward = useCallback(() => {
		history.goForward();
	}, [history]);

	const goTo = useCallback(
		(path: string) => {
			history.push(path);
		},
		[history],
	);

	const historyIndex = (
		history as unknown as {
			index: number;
		}
	).index;

	return (
		<NavBar
			canMoveForward={historyIndex < history.length - 1}
			canMoveBack={historyIndex > 0}
			currentAddress={`${location.pathname}${location.search}`}
			refresh={refresh}
			goBack={goBack}
			goForward={goForward}
			goTo={goTo}
		/>
	);
}
