import { useEffect, useState } from "react";
import Head from "next/head";

import { DefaultLayout } from "layouts";
import {
  addLeadingZero,
  calculateFee,
  calculateTotal,
  numberToBrCurrency,
  romanToArabic,
} from "functions";
import { useForm, useFormDispatch } from "stores";
import { Breadcrumb, Button, Input, OutlineButton, Select } from "components";

import styles from "styles/Form.module.css";

import type { IPokemonsInput, IResponse } from "types";
import { __VALUE_PER_POKEMON } from "constants/form";
import { __ROMAN_NUMERALS } from "constants/numerals";

interface IForm {
  data?: IResponse;
}

const Form = ({ data }: IForm) => {
  const state = useForm();
  const dispatch = useFormDispatch();

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

  const addPokemonInputHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!dispatch) return;

    if (state.pokemonsInput.length < 6) {
      dispatch({
        type: "ADD_POKEMON_INPUT",
      });
    }
  };

  const textInputHandler = (value: string | {}, name: string) => {
    if (!dispatch) return;

    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: name, value: value },
    });
  };

  const selectInputHandler = (
    value: string | {},
    name: string,
    id?: number
  ) => {
    if (!dispatch) return;

    if (name === "pokemon") {
      updateGenerationByPokemon(Number(id), Number(name));
    }

    dispatch({
      type: "CHANGE_SELECT",
      payload: { name: name, value: value, id: id },
    });
  };

  const [timeLoading, setTimeLoading] = useState(false);
  useEffect(() => {
    if (!dispatch) return;

    const fetchTimes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/scheduling/time",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: state.dateSelected?.label,
            }),
          }
        );

        const data = await response.json();

        dispatch({
          type: "FETCH_TIME",
          payload: data,
        });

        setTimeLoading(false);
      } catch (error) {
        setTimeLoading(false);
        console.error("Error:", error);
      }
    };

    if (state.dateSelected) {
      setTimeLoading(true);
      fetchTimes();
    }
  }, []);

  const [feeLoading, setFeeLoading] = useState(false);
  const updateGenerationByPokemon = async (
    pokemonId: number,
    selectedId: number
  ) => {
    if (!dispatch) return;

    try {
      setFeeLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/pokemon/generation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: pokemonId,
          }),
        }
      );

      const data = await response.json();
      const generation = data.split("-").slice(-1)[0].toUpperCase();

      dispatch({
        type: "SET_GENERATION",
        payload: { generation: romanToArabic(generation) },
      });

      setFeeLoading(false);
    } catch (error) {
      setFeeLoading(false);
      console.error("Error:", error);
    }
  };

  console.log(state);

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

          <section className={styles.container}>
            <h3>Preencha o formulário abaixo para agendar sua consulta</h3>

            <form className={styles.form}>
              <div className={styles.personal}>
                <div>
                  <label>Nome</label>
                  <Input
                    value={state.name}
                    placeholder="Nome"
                    onChange={(e) => textInputHandler(e.target.value, "name")}
                  />
                </div>
                <div>
                  <label>Sobrenome</label>
                  <Input
                    value={state.surname}
                    placeholder="Sobrenome"
                    onChange={(e) =>
                      textInputHandler(e.target.value, "surname")
                    }
                  />
                </div>
                <div>
                  <label>Região</label>
                  <Select
                    value={state.regionSelected}
                    onChange={(e) =>
                      selectInputHandler(e.target.value, "region")
                    }
                    options={state.region}
                    placeholder="Selecione sua região"
                  />
                </div>
                <div>
                  <label>Cidade</label>
                  <Select
                    value={state.locationSelected}
                    onChange={(e) =>
                      selectInputHandler(e.target.value, "location")
                    }
                    options={state.location}
                    placeholder="Selecione sua cidade"
                  />
                </div>
              </div>

              <div className={styles.pokemonsArea}>
                <h5>Cadastre seu time</h5>
                <span>Atendemos até 06 pokémons por vez</span>

                {state.pokemonsInput.map((pokemons: IPokemonsInput) => (
                  <div
                    className={styles.pokemonsInputs}
                    key={`input-pokemons-${pokemons.id}`}
                  >
                    <label>Pokemon {addLeadingZero(pokemons.id)}</label>
                    <Select
                      value={state.pokemonSelected?.[pokemons.id] || null}
                      onChange={(e) =>
                        selectInputHandler(
                          e.target.value,
                          "pokemon",
                          pokemons.id
                        )
                      }
                      options={state.pokemon}
                      placeholder="Selecione seu pokémon"
                    />
                  </div>
                ))}
              </div>

              <OutlineButton
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  addPokemonInputHandler(e)
                }
              >
                Adicionar novo pokémon ao time...
                <span className={styles.plus}>+</span>
              </OutlineButton>

              <div className={styles.personal}>
                <div>
                  <label>Data para Atendimento</label>
                  <Select
                    value={state.dateSelected?.value}
                    onChange={(e) => selectInputHandler(e.target.value, "date")}
                    options={state.date}
                    placeholder="Selecione uma data"
                  />
                </div>
                <div>
                  <label>Horário de Atendimento</label>
                  <Select
                    value={state.timeSelected?.value}
                    onChange={(e) => selectInputHandler(e.target.value, "time")}
                    options={state.time}
                    placeholder="Selecione um horário"
                  />
                </div>
              </div>

              <div className={styles.separador} />

              <div className={styles.resume}>
                <span>Número de pokémons a serem atendidos:</span>
                <span>{addLeadingZero(state.pokemonsInput.length)}</span>
                <span>Atendimento unitário por pokémon:</span>
                <span>{numberToBrCurrency(__VALUE_PER_POKEMON)}</span>
                <span>subtotal</span>
                <span>
                  {numberToBrCurrency(
                    state.pokemonsInput.length * __VALUE_PER_POKEMON
                  )}
                </span>
                <span>Taxa geracional*:</span>
                <span>{calculateFee(state.generation)}</span>
                <span></span>
              </div>

              <span className={styles.fees}>
                *adicionamos uma taxa de 3%, multiplicado pelo número da geração
                mais alta do time, com limite de até 30%
              </span>

              <div className={styles.total}>
                <h2>
                  Valor total:{" "}
                  {calculateTotal(state.generation, state.pokemonsInput.length)}
                </h2>
                <Button onClick={() => {}}>Concluir Agendamento</Button>
              </div>
            </form>
          </section>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Form;

// getServerSideProps way
// export async function getServerSideProps() {
//   const urls = [
//     "http://localhost:3000/api/pokemon/location",
//     "http://localhost:3000/api/pokemon/pokemon",
//     "http://localhost:3000/api/pokemon/region",
//   ];

//   const promises = urls.map((url) =>
//     fetch(url).then((response) => response.json())
//   );

//   try {
//     const results = await Promise.allSettled(promises);

//     const data = {
//       location: results[0].status === "fulfilled" ? results[0].value : null,
//       pokemon: results[1].status === "fulfilled" ? results[1].value : null,
//       region: results[2].status === "fulfilled" ? results[2].value : null,
//     };

//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     return {
//       props: { data: null },
//     };
//   }
// }
