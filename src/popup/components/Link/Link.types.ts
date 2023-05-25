import { PagesEnum } from '../../routing/PagesEnum';

export type LinkProps =
  | {
      to: PagesEnum;
      external?: false;
    }
  | {
      to: string;
      external: true;
    };
