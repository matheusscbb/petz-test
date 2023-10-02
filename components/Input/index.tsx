import styles from "styles/components/Input.module.css";

export interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, onChange, placeholder }: InputProps) => (
  <div className={styles.container}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeholder}
    />
  </div>
);
