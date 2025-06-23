import type { ReactElement } from "react";
import { action } from "storybook/actions";
import { FakeBrowser, type FakeBrowserProps } from "../FakeBrowser";

export function Example(props: FakeBrowserProps): ReactElement {
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
