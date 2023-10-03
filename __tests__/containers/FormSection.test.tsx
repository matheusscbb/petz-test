import { fireEvent, render } from "@testing-library/react";

import { FormSection } from "containers";
import { FormProvider } from "stores";

describe("FormSection", () => {
  const __ALL_ERRORS = {
    name: "Preencha com seu nome",
    surname: "Preencha com seu sobrenome",
    regionSelected: "Selecione uma região",
    locationSelected: "Selecione uma cidade",
    dateSelected: "Selecione uma data para o atendimento",
    timeSelected: "Selecione um horário para o atendimento",
    pokemonSelected: "Selecione todos os pokemons",
  };

  const __PLACEHOLDER = ["Nome", "Sobrenome"];

  it("should render form fields", () => {
    const { getByText } = render(<FormSection />);

    expect(getByText("Nome")).toBeTruthy();
    expect(getByText("Sobrenome")).toBeTruthy();
    expect(getByText("Região")).toBeTruthy();
    expect(getByText("Cidade")).toBeTruthy();
    expect(getByText("Data para Atendimento")).toBeTruthy();
    expect(getByText("Horário de Atendimento")).toBeTruthy();
  });

  it("should render form buttons", () => {
    const { getByText } = render(<FormSection />);

    expect(getByText("Adicionar novo pokémon ao time...")).toBeTruthy();
    expect(getByText("Concluir Agendamento")).toBeTruthy();
  });

  it("should have a pokemon input", () => {
    const { getByText, getAllByText } = render(
      <FormProvider>
        <FormSection />
      </FormProvider>
    );
    expect(getByText("Pokemon 01")).toBeTruthy();
    expect(getByText("01")).toBeTruthy();
    expect(getAllByText("R$ 70,00").length).toBe(2);
  });

  it("should add a new pokemon input", () => {
    const { getByText } = render(
      <FormProvider>
        <FormSection />
      </FormProvider>
    );

    fireEvent.click(getByText("Adicionar novo pokémon ao time..."));

    expect(getByText("Pokemon 01")).toBeTruthy();
    expect(getByText("Pokemon 02")).toBeTruthy();
    expect(getByText("02")).toBeTruthy();
    expect(getByText("R$ 140,00")).toBeTruthy();
  });

  it("should return all errors", () => {
    const { getByText } = render(
      <FormProvider>
        <FormSection />
      </FormProvider>
    );

    fireEvent.click(getByText("Concluir Agendamento"));

    Object.values(__ALL_ERRORS).forEach((error) => {
      expect(getByText(error)).toBeTruthy();
    });
  });

  it("should return errors except for name", () => {
    const { getByText, getByPlaceholderText } = render(
      <FormProvider>
        <FormSection />
      </FormProvider>
    );

    fireEvent.change(getByPlaceholderText("Nome"), {
      target: { value: "name" },
    });

    fireEvent.click(getByText("Concluir Agendamento"));

    Object.values(__ALL_ERRORS).forEach((error) => {
      if (error === __ALL_ERRORS.name) return;

      expect(getByText(error)).toBeTruthy();
    });
  });

  //   it("should return success on submit", () => {
  //     const { getByText, getByPlaceholderText, getAllByRole } = render(
  //       <FormProvider>
  //         <FormSection />
  //       </FormProvider>
  //     );

  //     __PLACEHOLDER.map((name: string) => {
  //       fireEvent.change(getByPlaceholderText(name), {
  //         target: { value: name },
  //       });
  //     });

  //     getAllByRole("combobox").map((item: HTMLElement) => {
  //       fireEvent.change(item, {
  //         target: { value: 1 },
  //       });
  //     });

  //     fireEvent.click(getByText("Concluir Agendamento"));

  //   expect(getByText("Consulta Agendada")).toBeTruthy();
  //   });
});
