import { IconsEnum } from '../SvgIcon';

export enum BadgeColorsEnum {
  gray = 'gray',
  primary = 'primary',
  error = 'error',
  warning = 'warning',
  yellow = 'yellow',
  success = 'success',
  blueGray = 'blue-gray',
  blueLight = 'blue-light',
  blue = 'blue',
  indigo = 'indigo',
  purple = 'purple',
  pink = 'pink',
  rose = 'rose',
  orange = 'orange',
}

export type BadgeProps = {
  className?: string;
  color: BadgeColorsEnum;
  dots?: boolean;
  icon?: IconsEnum;
  iconPosition?: 'left' | 'right';
  id?: string;
  text: string;
  onClick?: () => void;
  tooltip?: { 'data-tip'?: string; 'data-for'?: string };
};
