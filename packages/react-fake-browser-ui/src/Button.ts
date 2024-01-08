import styled from "styled-components";

export const Button = styled.button(({ disabled }) => ({
	marginLeft: "5px",
	marginRight: "5px",
	padding: 0,
	border: "none",
	backgroundColor: "transparent",
	cursor: disabled ? "default" : "pointer",
	width: "24px",
	height: "24px",
	borderRadius: "12px",
	outline: "none",
	color: disabled ? "#999" : "#333",

	":hover": disabled
		? undefined
		: {
				backgroundColor: "#ddd",
		  },

	":active": disabled
		? undefined
		: {
				backgroundColor: "#d0d0d0",
		  },
}));
