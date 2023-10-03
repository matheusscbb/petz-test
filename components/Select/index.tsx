import { HTMLAttributes } from "react";

import styles from "styles/components/Input.module.css";

import type { IOptions } from "types";

export interface SelectProps extends HTMLAttributes<HTMLElement> {
  value: string | null;
  placeholder?: string;
  options?: IOptions[];
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  value,
  options,
  onChange,
  disabled,
  placeholder,
  ...props
}: SelectProps) => (
  <div className={styles.selectContainer} {...props}>
    <select
      disabled={disabled}
      onChange={onChange}
      className={styles.select}
      value={value || "NULL_CASE"}
    >
      <>
        <option value="NULL_CASE" hidden>
          {placeholder || "Selecione..."}
        </option>
        {options?.map((option: IOptions) => (
          <option
            value={option.value}
            className={styles.customOption}
            key={`${option.id}-${option.label}`}
          >
            {option.label}
          </option>
        ))}
      </>
    </select>
  </div>
);
