import React from "react";

import styles from "styles/components/OutlineButton.module.css";

import type { ReactNode } from "react";

interface IOutlineButton {
  children: ReactNode;
  onClick: any;
}

export const OutlineButton = ({ children, onClick }: IOutlineButton) => (
  <button onClick={onClick} className={styles.button}>
    {children}
  </button>
);
