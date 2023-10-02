import Head from "next/head";
import { useEffect, useState } from "react";

import { useForm, useFormDispatch } from "stores";

import { DefaultLayout } from "layouts";
import { FormSection } from "containers";
import { hourStringAdjust } from "functions";
import { Breadcrumb, WarningSchedule } from "components";

import { __VALUE_PER_POKEMON } from "constants/form";
import { __ROMAN_NUMERALS } from "constants/numerals";

import styles from "styles/Form.module.css";

type PageFormsProp = "FORM" | "SUCCESS" | "FAIL";

const Form = () => {
  const state = useForm();
  const dispatch = useFormDispatch();

  const [pageStatus, setPageStatus] = useState<PageFormsProp>("FORM");

  useEffect(() => {
    if (!dispatch) return;

    const fetchInputsData = async () => {
      const urls = [
        "http://localhost:3000/api/pokemon/location",
        "http://localhost:3000/api/pokemon/pokemons",
        "http://localhost:3000/api/pokemon/region",
        "http://localhost:3000/api/scheduling/date",
      ];

      const promises = urls.map((url) =>
        fetch(url).then((response) => response.json())
      );

      try {
        const results = await Promise.allSettled(promises);

        const data = {
          location: results[0].status === "fulfilled" ? results[0].value : null,
          pokemon: results[1].status === "fulfilled" ? results[1].value : null,
          region: results[2].status === "fulfilled" ? results[2].value : null,
          date: results[3].status === "fulfilled" ? results[3].value : null,
        };

        dispatch({
          type: "FETCH_SUCCESS",
          payload: { ...data },
        });
      } catch (error) {
        console.error("Error fetching data:", error);

        dispatch({
          type: "FETCH_ERROR",
          payload: error,
        });
      }
    };

    if (!state.loaded && !state.loading) {
      dispatch({ type: "FETCH_START" });
      fetchInputsData();
    }
  });

  return (
    <>
      <Head>
        <title>Centro Pokémon - Agendar Consulta</title>
        <meta
          name="description"
          content="Página para agendar uma consulta para seus pokémons"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultLayout>
        <div className={styles.main}>
          <Breadcrumb description="Recupere seus pokémons em 5 segundos" />
          {pageStatus == "FORM" ? (
            <FormSection setPageStatus={setPageStatus} />
          ) : pageStatus == "SUCCESS" ? (
            <section className={styles.warningContainer}>
              <WarningSchedule
                type="SUCCESS"
                onClick={() => setPageStatus("FORM")}
              >
                Seu agendamento para dia {state.dateSelected?.label}, às{" "}
                {hourStringAdjust(state.timeSelected?.label)}, para{" "}
                {state.pokemonsInput.length}x pokémons foi realizado com
                sucesso!
              </WarningSchedule>
            </section>
          ) : (
            <section className={styles.warningContainer}>
              <WarningSchedule
                type="FAIL"
                onClick={() => setPageStatus("FORM")}
              >
                error message
              </WarningSchedule>
            </section>
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default Form;
