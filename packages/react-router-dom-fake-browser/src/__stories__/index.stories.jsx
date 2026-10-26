import { Browser } from "../Browser.js";
import { Example } from "./Example.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react"
 */

/** @type {Meta<typeof Browser>} */
const meta = {
	title: "react-router-dom-fake-browser",
	component: Browser,
	tags: ["autodocs"],
};

export default meta;

/**
 * @typedef {StoryObj<typeof Browser>} Story
 */

/** @type {Story} */
export const ExampleStory = {
	name: "Example",
	render: (props) => <Example {...props} />,
	args: {
		initialEntries: ["/one", "/two", "/three"],
		initialIndex: 0,
	},
};
