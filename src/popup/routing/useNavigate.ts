import { useContext } from 'react';

import { NavigationContext } from './NavigationContext';

export const useNavigate = () => {
  return useContext(NavigationContext);
};
