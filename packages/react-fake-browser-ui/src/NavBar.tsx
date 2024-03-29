import { definition as faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { definition as faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { definition as faRedo } from "@fortawesome/free-solid-svg-icons/faRedo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import styled from "styled-components";
import { Address } from "./Address";
import { Button } from "./Button";

const StyledNavBar = styled.div({
	display: "flex",
	padding: "5px",
	backgroundColor: "#f6f6f6",
});

export type NavBarProps = {
	canMoveForward: boolean;
	canMoveBack: boolean;
	currentAddress: string;
	refresh: () => void;
	goBack: () => void;
	goForward: () => void;
	goTo: (nextAddress: string) => void;
};

export function NavBar({
	canMoveForward,
	canMoveBack,
	currentAddress,
	refresh,
	goBack,
	goForward,
	goTo,
}: NavBarProps): ReactElement {
	return (
		<StyledNavBar>
			<Button type="button" onClick={goBack} disabled={!canMoveBack}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Button>

			<Button type="button" onClick={goForward} disabled={!canMoveForward}>
				<FontAwesomeIcon icon={faArrowRight} />
			</Button>

			<Button type="button" onClick={refresh}>
				<FontAwesomeIcon icon={faRedo} />
			</Button>

			<Address currentAddress={currentAddress} goTo={goTo} refresh={refresh} />
		</StyledNavBar>
	);
}
