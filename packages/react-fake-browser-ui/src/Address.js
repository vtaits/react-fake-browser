import { definition as faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import useLatest from "use-latest";

/**
 * @import { ChangeEvent, SubmitEvent } from "react"
 */

/**
 * @typedef {Object} AddressProps
 * @property {string} currentAddress
 * @property {() => void} refresh
 * @property {(nextAddress: string) => void} goTo
 */

/**
 * @param {AddressProps} props
 */
export function Address({ currentAddress, refresh, goTo }) {
	const [address, setAddress] = useState(currentAddress);
	const addressRef = useLatest(address);

	const isSameAddresses = address === currentAddress;
	const isSameAddressesRef = useLatest(isSameAddresses);

	const onChange = useCallback(
		/**
		 * @param {ChangeEvent<HTMLInputElement>} event
		 */
		(event) => {
			setAddress(event.target.value);
		},
		[],
	);

	const onSubmit = useCallback(
		/**
		 * @param {SubmitEvent} event
		 */
		(event) => {
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

	return jsxs("form", {
		onSubmit,
		className: "fake-browser__address-form",
		children: [
			jsx("input", {
				className: "fake-browser__address-input",
				type: "text",
				value: address,
				onChange,
			}),
			address !== currentAddress &&
				jsx("button", {
					className: "fake-browser__navigate-button",
					type: "submit",
					"aria-label": "Navigate",
					children: jsx(FontAwesomeIcon, {
						icon: faAngleRight,
					}),
				}),
		],
	});
}
