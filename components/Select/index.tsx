import styles from "styles/components/Input.module.css";
import type { IOptions } from "types";

interface SelectProps {
  value: string | null;
  placeholder?: string;
  options?: IOptions[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
  value,
  onChange,
  options,
  placeholder,
}: SelectProps) => (
  <div className={styles.selectContainer}>
    <select
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
