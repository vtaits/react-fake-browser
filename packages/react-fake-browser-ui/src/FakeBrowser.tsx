import type { PropsWithChildren, ReactElement } from "react";
import { NavBar } from "./NavBar";

export type FakeBrowserProps = Readonly<
	PropsWithChildren<{
		canMoveForward: boolean;
		canMoveBack: boolean;
		currentAddress: string;
		refresh: () => void;
		goBack: () => void;
		goForward: () => void;
		goTo: (nextAddress: string) => void;
	}>
>;

export function FakeBrowser({
	canMoveForward,
	canMoveBack,
	currentAddress,
	refresh,
	goBack,
	goForward,
	goTo,
	children,
}: FakeBrowserProps): ReactElement {
	return (
		<>
			<NavBar
				canMoveForward={canMoveForward}
				canMoveBack={canMoveBack}
				currentAddress={currentAddress}
				refresh={refresh}
				goBack={goBack}
				goForward={goForward}
				goTo={goTo}
			/>

			{children}
		</>
	);
}

FakeBrowser.defaultProps = {
	children: undefined,
};
