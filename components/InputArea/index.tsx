import React from "react";

import { ErrorLabel, Input, Select } from "components";

import { InputProps } from "components";

import styles from "styles/components/Select.module.css";

interface IInputArea extends InputProps {
  error: string | undefined | null;
  label: string;
}

export const InputArea = ({
  label,
  error,
  value,
  onChange,
  placeholder,
}: IInputArea) => (
  <div>
    <label className={styles.label}>{label}</label>

    <Input value={value} onChange={onChange} placeholder={placeholder} />

    <ErrorLabel>{error}</ErrorLabel>
  </div>
);
