import Head from "next/head";

import { DefaultLayout } from "layouts";
import { Breadcrumb } from "components";

import styles from "styles/About.module.css";

import { __ABOUT_TEXT } from "constants/index";

export default function About() {
  return (
    <>
      <Head>
        <title>Centro Pokémon - Quem Somos</title>
        <meta
          name="description"
          content="Texto para conhecer um pouco mais sobre nós"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultLayout>
        <main className={styles.main}>
          <Breadcrumb description="A maior rede de tratamento pokémon." />

          <div className={styles.container}>
            <h3>O Centro Pokémon</h3>

            {__ABOUT_TEXT.map((text: any) => (
              <span key={`about-texts-${text.id}`}>
                <h4>{text.title}</h4>
                <p>{text.description}</p>
              </span>
            ))}
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
