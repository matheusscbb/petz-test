import { prepareDate, prepareOptions } from "functions";
import { createContext, useContext, useReducer } from "react";

import type { ReactNode } from "react";
import type { IOptions, IPokemonsInput, IResponse } from "types";

type ErrorProps = {
  message: string;
};

type ErrorsProps = {
  [key: number]: ErrorProps;
};

interface FormProps {
  loaded: boolean;
  loading: boolean;
  isSubmitting: boolean;
  location: IOptions[] | [];
  pokemon: IOptions[] | [];
  region: IOptions[] | [];
  date: IOptions[] | [];
  time: IOptions[] | [];
  locationSelected: string | number | null;
  pokemonSelected: IPokemonsInput;
  regionSelected: string | number | null;
  timeSelected: string | null;
  dateSelected: string | null;
  pokemonsInput: IPokemonsInput[];
  errors: ErrorsProps;
  name: string;
  surname: string;
}

const INITIAL_STATE: any = {
  loaded: false,
  loading: false,
  isSubmitting: false,
  location: [],
  pokemon: [],
  region: [],
  locationSelected: null,
  pokemonSelected: null,
  regionSelected: null,
  dateSelected: null,
  timeSelected: null,
  pokemonsInput: [{ id: 1, name: undefined }],
  name: "",
  surname: "",
  errors: {} as ErrorsProps,
};

const FormContext = createContext(INITIAL_STATE);
const FormDispatchContext = createContext<React.Dispatch<any> | null>(null);

interface FormProvider {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProvider) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <FormContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
};

export function useForm() {
  return useContext(FormContext);
}

export function useFormDispatch() {
  return useContext<React.Dispatch<any> | null>(FormDispatchContext);
}

const reducer = (state: FormProps, action: any): FormProps => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        location: prepareOptions(action.payload?.location),
        pokemon: prepareOptions(action.payload?.pokemon),
        region: prepareOptions(action.payload?.region),
        date: prepareDate(action.payload?.date),
        loaded: true,
        loading: false,
      };

    case "FETCH_TIME":
      return {
        ...state,
        time: prepareDate(action.payload),
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loaded: true,
        loading: false,
      };

    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
      };
    case "SUBMIT_END":
      return {
        ...state,
        isSubmitting: false,
      };

    case "ADD_POKEMON_INPUT":
      return {
        ...state,
        pokemonsInput: [
          ...state.pokemonsInput,
          { id: [...state.pokemonsInput].length + 1, name: undefined },
        ],
      };

    case "CHANGE_INPUT":
      return {
        ...state,
        [action?.payload?.name]: action?.payload?.value,
      };

    case "CHANGE_SELECT":
      const obj: any = {};

      switch (action?.payload?.name) {
        case "region":
          obj.regionSelected = state.region.find(
            (r: any) => r.value === Number(action?.payload?.value)
          )?.value;
          break;
        case "location":
          obj.locationSelected = state.location.find(
            (r: any) => r.value === Number(action?.payload?.value)
          )?.value;
          break;
        case "pokemon":
          const selected = state.pokemon.find(
            (r: any) => r.value === Number(action?.payload?.value)
          );

          obj.pokemonSelected = {
            ...state.pokemonSelected,
            [action?.payload?.id]: selected?.value,
          };
          // A not-so-optimal way to apply, but I don't have time to fix the form
          obj.completePokemonSelected = {
            ...state.pokemonSelected,
            [action?.payload?.id]: selected?.value,
          };
          break;
        case "date":
          obj.dateSelected = state.date.find(
            (r: any) => r.value === Number(action?.payload?.value)
          );
          obj.timeSelected = null;
          break;
        case "time":
          obj.timeSelected = state.time.find(
            (r: any) => r.value === Number(action?.payload?.value)
          );
          break;
        default:
          break;
      }

      return {
        ...state,
        ...obj,
      };

    default:
      return state;
  }
};
