import { FakeBrowser } from "../FakeBrowser.js";
import { Example } from "./Example.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react-vite"
 */

/** @type {Meta<typeof FakeBrowser>} */
const meta = {
	title: "react-fake-browser-ui",
	component: FakeBrowser,
	tags: ["autodocs"],
};

export default meta;

/**
 * @typedef {StoryObj<typeof FakeBrowser>} Story
 */

/** @type {Story} */
export const ExampleStory = {
	name: "Example",
	render: (props) => <Example {...props} />,
	args: {
		canMoveForward: false,
		canMoveBack: false,
		currentAddress: "",
	},
};
