import {
  useContext,
  useCallback,
} from 'react';
import type {
  ReactElement,
} from 'react';

import {
  UNSAFE_NavigationContext,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  NavBar,
} from '@vtaits/react-fake-browser-ui';

import type {
  HistoryType,
} from './types';

export type NavBarForRouterProps = {
  refresh: () => void;
};

export function NavBarForRouter({
  refresh,
}: NavBarForRouterProps): ReactElement {
  const {
    navigator,
  } = useContext(UNSAFE_NavigationContext);

  const history = navigator as unknown as HistoryType;

  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const goTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

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
}
