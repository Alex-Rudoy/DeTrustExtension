import { CSSProperties } from 'react';

export enum IconsEnum {
  minus = '/icons/minus.svg',
  arrow = '/icons/arrow.svg',
  loader = '/icons/loader.svg',
  showPassword = '/icons/show-password.svg',
  hidePassword = '/icons/hide-password.svg',
}

export type SvgIconProps = {
  src: IconsEnum;
  onClick?: () => void;
  size?: number;
  rotate?: '0' | '90' | '180' | '270';
  className?: string;
  style?: CSSProperties;
};
