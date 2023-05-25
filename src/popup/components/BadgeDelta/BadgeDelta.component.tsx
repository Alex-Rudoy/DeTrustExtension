import classNames from 'classnames';

import { Badge, BadgeColorsEnum } from '../Badge';
import { IconsEnum } from '../SvgIcon';

import { BadgeDeltaProps } from './BadgeDelta.types';

import styles from './BadgeDelta.module.scss';

export const BadgeDeltaComponent = ({
  value,
  percent = false,
  className,
  onClick = () => null,
}: BadgeDeltaProps) => {
  let color = BadgeColorsEnum.primary;
  if (value > 0) color = BadgeColorsEnum.success;
  if (value < 0) color = BadgeColorsEnum.error;

  const badgeDeltaClass = classNames({ [styles.bigger]: value > 0 }, className);

  return (
    <Badge
      icon={value === 0 ? IconsEnum.minus : IconsEnum.arrow}
      color={color}
      text={`${value}${percent ? '%' : ''}`}
      className={badgeDeltaClass}
      onClick={onClick}
    />
  );
};

BadgeDeltaComponent.displayName = 'BadgeDelta';
