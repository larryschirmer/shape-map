import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './ListButton.module.scss';

export type Props = {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  'aria-label'?: string;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const ListButton = (props: Props) => {
  const {
    children,
    type = 'button',
    'aria-label': ariaLabel = 'button',
    disabled = false,
    isActive = false,
    onClick,
  } = props;

  const buttonClass = classNames(styles['list-button'], {
    [styles['is-active']]: isActive
  })

  return (
    <button className={buttonClass} aria-label={ariaLabel} {...{ type, disabled, onClick }}>{children}</button>
  )
}

export default ListButton