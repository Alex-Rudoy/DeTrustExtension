import { useMemo, useState } from 'react';

import { NavigationContext } from './routing/NavigationContext';
import { PagesEnum } from './routing/PagesEnum';
import { routes } from './routing/routes';

import './styles/index.scss';

export const App = () => {
  const [currentPage, navigateTo] = useState<PagesEnum>(PagesEnum.login);

  const contextValue = useMemo(
    () => ({ currentPage, navigateTo }),
    [currentPage, navigateTo],
  );

  const Page = routes[currentPage];

  return (
    <NavigationContext.Provider value={contextValue}>
      <Page />
    </NavigationContext.Provider>
  );
};
