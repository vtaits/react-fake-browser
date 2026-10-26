import { action } from "storybook/actions";
import { FakeBrowser } from "../FakeBrowser.js";

/**
 * @import {FakeBrowserProps} from "../FakeBrowser.js"
 */

/**
 * @param {FakeBrowserProps} props
 */
export function Example(props) {
	return (
		<FakeBrowser
			{...props}
			refresh={action("refresh")}
			goBack={action("goBack")}
			goForward={action("goForward")}
			goTo={action("goTo")}
		>
			Hello, world!
		</FakeBrowser>
	);
}
