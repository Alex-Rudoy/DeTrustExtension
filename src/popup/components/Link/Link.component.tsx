import { PropsWithChildren } from 'react';

import { useNavigate } from '../../routing/useNavigate';

import { PagesEnum } from '../../routing/PagesEnum';

import { LinkProps } from './Link.types';

import styles from './Link.module.scss';

export const LinkComponent = ({
  to,
  external = false,
  children,
}: PropsWithChildren<LinkProps>) => {
  const { navigateTo } = useNavigate();

  if (external === true) {
    return (
      <a
        href={to}
        className={styles.link}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <span onClick={() => navigateTo(to as PagesEnum)} className={styles.link}>
      {children}
    </span>
  );
};

LinkComponent.displayName = 'Link';
