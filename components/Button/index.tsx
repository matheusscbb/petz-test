import React from "react";

import styles from "styles/components/Button.module.css";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: IButton) => (
  <button onClick={onClick} className={styles.button}>
    {children}
  </button>
);
