import {
  useCallback,
} from 'react';
import type {
  FC,
} from 'react';
import {
  useHistory as defaultUseHistory,
  useLocation as defaultUseLocation,
} from 'react-router-dom';
import {
  NavBar,
} from '@vtaits/react-fake-browser-ui';

type Props = {
  refresh: () => void;
  useHistory?: typeof defaultUseHistory;
  useLocation?: typeof defaultUseLocation;
};

const NavBarForRouter: FC<Props> = ({
  refresh,
  useHistory,
  useLocation,
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

  const historyIndex = (history as unknown as {
    index: number;
  }).index;

  return (
    <NavBar
      canMoveForward={historyIndex < history.length - 1}
      canMoveBack={historyIndex > 0}
      currentAddress={`${location.pathname}${location.search}`}
      refresh={refresh}
      goBack={goBack}
      goForward={goForward}
      goTo={goTo}
    />
  );
};

NavBarForRouter.defaultProps = {
  useHistory: defaultUseHistory,
  useLocation: defaultUseLocation,
};

export default NavBarForRouter;
