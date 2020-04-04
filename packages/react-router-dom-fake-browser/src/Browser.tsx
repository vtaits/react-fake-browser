import React, {
  useState as defaultUseState,
  useCallback,
  Fragment,
  FC,
  ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import {
  MemoryRouter,
} from 'react-router-dom';

import NavBarForRouter from './NavBarForRouter';

const increase = (prevValue: number): number => prevValue + 1;

const Browser: FC<{
  children?: ReactNode;
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

Browser.propTypes = {
  children: PropTypes.node,
  useState: PropTypes.func,
};

Browser.defaultProps = {
  children: null,
  useState: defaultUseState,
};

export default Browser;
