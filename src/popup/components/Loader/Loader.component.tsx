import { IconsEnum, SvgIcon } from '../SvgIcon';

import styles from './Loader.module.scss';

export const LoaderComponent = () => {
  return <SvgIcon src={IconsEnum.loader} size={40} className={styles.loader} />;
};

LoaderComponent.displayName = 'Loader';
