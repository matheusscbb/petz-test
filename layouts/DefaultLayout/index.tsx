import { Header, Footer } from "components";

import { Inter } from "@next/font/google";

import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface ILayout {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: ILayout) => (
  <>
    <Header />
    <main className={inter.className}>{children}</main>
    <Footer />
  </>
);
