import Image from "next/image";

import styles from "styles/components/AnimatedButton.module.css";

import type { ReactNode } from "react";

interface IAnimatedButton {
  children: ReactNode;
  onClick: () => void;
  isAnimationActive: boolean;
}

export const AnimatedButton = ({
  children,
  onClick,
  isAnimationActive,
}: IAnimatedButton) => (
  <button onClick={onClick} className={styles.button}>
    <div
      className={`${styles.background} ${isAnimationActive && styles.active}`}
    >
      <div className={styles.pokeball}>
        <Image
          width={36}
          height={36}
          alt="pokeball"
          src="/images/white-pokeball.svg"
        />
      </div>

      <span
        className={`${styles.text} ${isAnimationActive && styles.spanActive}`}
      >
        {children}
      </span>
    </div>
  </button>
);
