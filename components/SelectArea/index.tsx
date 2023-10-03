import React from "react";

import { ErrorLabel, Select } from "components";

import { SelectProps } from "components";

import styles from "styles/components/Select.module.css";

interface ISelectArea extends SelectProps {
  error: string | undefined | null;
  label: string;
  disabled?: boolean;
}

export const SelectArea = ({
  label,
  error,
  value,
  options,
  onChange,
  disabled,
  placeholder,
}: ISelectArea) => (
  <div>
    <label className={styles.label}>{label}</label>

    <Select
      disabled={disabled}
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />

    <ErrorLabel>{error}</ErrorLabel>
  </div>
);
