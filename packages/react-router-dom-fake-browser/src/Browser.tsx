import {
  useState as defaultUseState,
  useCallback,
  Fragment,
} from 'react';
import type {
  ComponentProps,
  FC,
} from 'react';
import {
  MemoryRouter,
} from 'react-router-dom';

import NavBarForRouter from './NavBarForRouter';

const increase = (prevValue: number): number => prevValue + 1;

const Browser: FC<ComponentProps<typeof MemoryRouter> & {
  useState?: typeof defaultUseState;
}> = (props) => {
  const {
    children,
    useState,
    ...rest
  } = props;

  const [uniq, setUniq] = useState(1);

  const refresh = useCallback(() => {
    setUniq(increase);
  }, []);

  return (
    <MemoryRouter
      {...rest}
    >
      <NavBarForRouter
        refresh={refresh}
      />

      {
        [
          <Fragment
            key={uniq}
          >
            {children}
          </Fragment>,
        ]
      }
    </MemoryRouter>
  );
};

Browser.defaultProps = {
  useState: defaultUseState,
};

export default Browser;
