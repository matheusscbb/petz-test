import styles from "styles/Footer.module.css";

import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={inter.className}>
      Todas as marcas e ilustrações utilizadas são de seus resepctivos donos.
    </p>
  </footer>
);
