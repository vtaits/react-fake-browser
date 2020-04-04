import React, {
  useCallback,
  FC,
} from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  NavBar,
} from '@vtaits/react-fake-browser-ui';

type Props = {
  refresh: () => void;
};

const NavBarForRouter: FC<Props> = ({
  refresh,
}) => {
  const history = useHistory();
  const location = useLocation();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const goForward = useCallback(() => {
    history.goForward();
  }, [history]);

  const goTo = useCallback((path) => {
    history.push(path);
  }, [history]);

  return (
    <NavBar
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      canMoveForward={history.index < history.length - 1}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      canMoveBack={history.index > 0}
      currentAddress={`${location.pathname}${location.search}`}
      refresh={refresh}
      goBack={goBack}
      goForward={goForward}
      goTo={goTo}
    />
  );
};

NavBarForRouter.propTypes = {
  refresh: PropTypes.func.isRequired,
};

export default NavBarForRouter;
