import React from "react";

import { ErrorLabel, Select } from "components";

import { SelectProps } from "components";

import styles from "styles/components/Select.module.css";

interface ISelectArea extends SelectProps {
  error: string | undefined | null;
  label: string;
}

export const SelectArea = ({
  label,
  error,
  value,
  options,
  onChange,
  placeholder,
}: ISelectArea) => (
  <div>
    <label className={styles.label}>{label}</label>

    <Select
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />

    <ErrorLabel>{error}</ErrorLabel>
  </div>
);
