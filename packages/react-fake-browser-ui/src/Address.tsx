import { definition as faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement, SyntheticEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useLatest from "use-latest";

export const StyledForm = styled.form({
	flex: 1,
	marginLeft: "5px",
	marginRight: "5px",
	position: "relative",
});

export const StyledButton = styled.button({
	position: "absolute",
	top: 0,
	right: 0,
	padding: 0,
	border: "none",
	backgroundColor: "transparent",
	cursor: "pointer",
	width: "24px",
	height: "24px",
	borderRadius: "12px",
	outline: "none",
	color: "#333",

	":hover": {
		backgroundColor: "#ddd",
	},

	":active": {
		backgroundColor: "#d0d0d0",
	},
});

export const StyledInput = styled.input({
	boxSizing: "border-box",
	outline: "none",
	width: "100%",
	height: "24px",
	borderRadius: "12px",
	border: "none",
	paddingLeft: "12px",
	paddingRight: "40px",
});

export type AddressProps = Readonly<{
	currentAddress: string;
	refresh: () => void;
	goTo: (nextAddress: string) => void;
}>;

export function Address({
	currentAddress,
	refresh,
	goTo,
}: AddressProps): ReactElement {
	const [address, setAddress] = useState(currentAddress);
	const addressRef = useLatest(address);

	const isSameAddresses = address === currentAddress;
	const isSameAddressesRef = useLatest(isSameAddresses);

	const onChange = useCallback((event: SyntheticEvent) => {
		setAddress((event.target as HTMLInputElement).value);
	}, []);

	const onSubmit = useCallback(
		(event: SyntheticEvent) => {
			event.preventDefault();

			if (isSameAddressesRef.current) {
				refresh();
			} else {
				goTo(addressRef.current);
			}
		},
		[addressRef, goTo, isSameAddressesRef, refresh],
	);

	useEffect(() => {
		if (!isSameAddressesRef.current) {
			setAddress(currentAddress);
		}
	}, [currentAddress, isSameAddressesRef]);

	return (
		<StyledForm onSubmit={onSubmit}>
			<StyledInput type="text" value={address} onChange={onChange} />

			{address !== currentAddress && (
				<StyledButton type="submit">
					<FontAwesomeIcon icon={faAngleRight} />
				</StyledButton>
			)}
		</StyledForm>
	);
}
