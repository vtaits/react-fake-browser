import { Fragment, useCallback, useState } from "react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import type { MemoryRouterProps } from "react-router-dom";
import { NavBarForRouter } from "./NavBarForRouter";

const increase = (prevValue: number): number => prevValue + 1;

export function Browser(props: MemoryRouterProps): ReactElement {
	const { children, ...rest } = props;

	const [uniq, setUniq] = useState(1);

	const refresh = useCallback(() => {
		setUniq(increase);
	}, []);

	return (
		<MemoryRouter {...rest}>
			<NavBarForRouter refresh={refresh} />

			<Fragment key={uniq}>{children}</Fragment>
		</MemoryRouter>
	);
}
