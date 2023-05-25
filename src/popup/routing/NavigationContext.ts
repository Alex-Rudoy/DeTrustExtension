import { createContext } from 'react';

import { PagesEnum } from './PagesEnum';

export const NavigationContext = createContext({
  currentPage: PagesEnum.login,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigateTo: (page: PagesEnum) => {},
});
