import styles from "styles/components/ErrorLabel.module.css";

import type { HTMLAttributes, ReactNode } from "react";

interface IErrorLabel extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const ErrorLabel = ({ children, ...porps }: IErrorLabel) => (
  <span className={styles.errorLabel} {...porps}>
    {children}
  </span>
);
