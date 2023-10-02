import { useEffect, useState } from "react";

import { useForm, useFormDispatch } from "stores";

import {
  calculateFee,
  romanToArabic,
  calculateTotal,
  addLeadingZero,
  numberToBrCurrency,
  objectIsEmpty,
} from "functions";
import {
  Input,
  Button,
  Select,
  ErrorLabel,
  OutlineButton,
  SelectArea,
  InputArea,
} from "components";

import { __VALUE_PER_POKEMON } from "constants/form";
import { __ROMAN_NUMERALS } from "constants/numerals";

import styles from "styles/containers/FormSection.module.css";

import type { IPokemonsInput, IResponse } from "types";

interface IForm {
  data?: IResponse;
  setPageStatus?: any;
}

export const FormSection = ({ data, setPageStatus }: IForm) => {
  const state = useForm();
  const dispatch = useFormDispatch();

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
      updateGenerationByPokemon(Number(id));
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
  }, [state.dateSelected]);

  const [feeLoading, setFeeLoading] = useState(false);
  const updateGenerationByPokemon = async (pokemonId: number) => {
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

  const validateForm = () => {
    if (!dispatch) return;

    const errors: any = {};

    if (!state.name) {
      errors.name = "Preencha com seu nome";
    }

    if (!state.surname) {
      errors.surname = "Preencha com seu sobrenome";
    }

    if (!state.regionSelected) {
      errors.regionSelected = "Selecione uma região";
    }

    if (!state.locationSelected) {
      errors.locationSelected = "Selecione uma cidade";
    }

    if (!state.dateSelected) {
      errors.dateSelected = "Selecione uma data para o atendimento";
    }

    if (!state.timeSelected) {
      errors.timeSelected = "Selecione um horário para o atendimento";
    }

    const pokemonsLength =
      state.pokemonSelected && Object?.keys(state.pokemonSelected)?.length;
    if (!pokemonsLength || pokemonsLength !== state.pokemonsInput.length) {
      errors.pokemonSelected = "Selecione todos os pokemons";
    }

    dispatch({
      type: "SET_ERROS",
      payload: errors,
    });

    return objectIsEmpty(errors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dispatch) return;

    // TODO add logics
    if (validateForm()) {
      // Logic to submit
      const response = true;

      // redirect if success
      if (!!response) {
        setPageStatus("SUCCESS");
      } else {
        // redirect if error
        setPageStatus("FAIL");
      }

      // DISPATCH CLEAN STATE
    }
  };

  return (
    <section className={styles.container}>
      <h3>Preencha o formulário abaixo para agendar sua consulta</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.personal}>
          <InputArea
            label="Nome"
            value={state.name}
            placeholder="Nome"
            onChange={(e) => textInputHandler(e.target.value, "name")}
            error={state.errors.name}
          />
          <InputArea
            label="Sobrenome"
            value={state.surname}
            placeholder="Sobrenome"
            onChange={(e) => textInputHandler(e.target.value, "surname")}
            error={state.errors.surname}
          />

          <SelectArea
            options={state.region}
            label="Região"
            placeholder="Selecione sua região"
            value={state.regionSelected}
            error={state.errors.regionSelected}
            onChange={(e) => selectInputHandler(e.target.value, "region")}
          />
          <SelectArea
            options={state.region}
            label="Cidade"
            placeholder="Selecione sua cidade"
            value={state.locationSelected}
            error={state.errors.locationSelected}
            onChange={(e) => selectInputHandler(e.target.value, "location")}
          />
        </div>

        <div className={styles.pokemonsArea}>
          <h5>Cadastre seu time</h5>
          <span className={styles.pokemonsAreaSubtitle}>
            Atendemos até 06 pokémons por vez
          </span>

          {state.pokemonsInput.map((pokemons: IPokemonsInput, idx: number) => (
            <span key={`input-pokemons-${pokemons.id}`}>
              <div className={styles.pokemonsInputs}>
                <label className={styles.pokemonsLabel}>
                  Pokemon {addLeadingZero(pokemons.id)}
                </label>
                <Select
                  value={state.pokemonSelected?.[pokemons.id] || null}
                  onChange={(e) =>
                    selectInputHandler(e.target.value, "pokemon", pokemons.id)
                  }
                  options={state.pokemon}
                  placeholder="Selecione seu pokémon"
                />
              </div>

              {idx + 1 === state.pokemonsInput.length && (
                <ErrorLabel style={{ marginTop: "-32px" }}>
                  {state.errors.pokemonSelected}
                </ErrorLabel>
              )}
            </span>
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
          <SelectArea
            options={state.date}
            label="Data para Atendimento"
            placeholder="Selecione uma data"
            value={state.dateSelected?.value}
            error={state.errors.dateSelected}
            onChange={(e) => selectInputHandler(e.target.value, "date")}
          />
          <SelectArea
            options={state.time}
            label="Horário de Atendimento"
            placeholder="Selecione um horário"
            value={state.timeSelected?.value}
            error={state.errors.timeSelected}
            onChange={(e) => selectInputHandler(e.target.value, "time")}
          />
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
        </div>

        <span className={styles.fees}>
          *adicionamos uma taxa de 3%, multiplicado pelo número da geração mais
          alta do time, com limite de até 30%
        </span>

        <div className={styles.total}>
          <h2>
            Valor total:{" "}
            {calculateTotal(state.generation, state.pokemonsInput.length)}
          </h2>

          <Button type="submit">Concluir Agendamento</Button>
        </div>
      </form>
    </section>
  );
};

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
