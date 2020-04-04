import React, {
  useState,
  useCallback,
  Fragment,
  FC,
  ReactNode,
} from 'react';
import {
  MemoryRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import NavBarForRouter from './NavBarForRouter';

const increase = (prevValue: number): number => prevValue + 1;

const Browser: FC<{
  children?: ReactNode;
}> = (props) => {
  const {
    children,
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
};

Browser.defaultProps = {
  children: null,
};

export default Browser;
