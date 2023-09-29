import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AnimatedButton, Button } from "../";

import { Inter } from "@next/font/google";

import styles from "styles/Header.module.css";

const inter = Inter({ subsets: ["latin"] });

export const Header = () => {
  const router = useRouter();

  const handleScheduleButtonClick = () => {
    router.push("/agendar-consulta");
  };

  const handleHomeButtonClick = () => {
    router.push("/");
  };

  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    setIsAnimationActive(true);

    setTimeout(() => {
      setIsAnimationActive(false);
    }, 5000);
  }, []);

  return (
    <header className={inter.className}>
      <div className={styles.header}>
        <AnimatedButton
          onClick={handleHomeButtonClick}
          isAnimationActive={isAnimationActive}
        >
          Centro Pokémon
        </AnimatedButton>

        <nav className={styles.nav}>
          <Link href="/quem-somos">Quem Somos</Link>
          <Button onClick={handleScheduleButtonClick}>Agendar Consulta</Button>
        </nav>
      </div>
    </header>
  );
};
