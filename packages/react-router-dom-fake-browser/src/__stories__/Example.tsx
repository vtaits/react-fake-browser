import { type ReactElement, useEffect, useState } from "react";
import { Link, type MemoryRouterProps, Route, Routes } from "react-router-dom";
import { Browser } from "../Browser";

export function Example(props: MemoryRouterProps): ReactElement {
	const { initialEntries, initialIndex } = props;

	const [key, setKey] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: storybook refresh
	useEffect(() => {
		setKey((prevValue) => prevValue + 1);
	}, [initialEntries, initialIndex]);

	return (
		<Browser {...props} key={key}>
			<Routes>
				<Route path="one" element={<h1>Hello &quot;/one&quot;</h1>} />

				<Route path="two" element={<h1>Hello &quot;/two&quot;</h1>} />

				<Route path="three" element={<h1>Hello &quot;/three&quot;</h1>} />
			</Routes>

			<ul>
				<li>
					<Link to="/one">one</Link>
				</li>

				<li>
					<Link to="/two">two</Link>
				</li>

				<li>
					<Link to="/three">three</Link>
				</li>
			</ul>
		</Browser>
	);
}
