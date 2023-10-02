import React from "react";
import Image from "next/image";

import { Button } from "components";

import styles from "styles/components/WarningSchedule.module.css";

import type { ReactNode } from "react";

interface IWarningSchedule {
  children: ReactNode;
  onClick: any;
  type: "SUCCESS" | "FAIL";
}

export const WarningSchedule = ({
  children,
  onClick,
  type,
}: IWarningSchedule) => (
  <div className={styles.warningScheduleContainer}>
    <h4 className={styles.warningScheduleTitle}>
      {type === "SUCCESS"
        ? "Consulta Agendada"
        : "Houve um problema no agendamento"}
    </h4>

    <Image
      width={42}
      height={42}
      alt="Logo do agendamento"
      src={`/${type === "SUCCESS" ? "check.svg" : "warning.svg"}`}
    />

    <span className={styles.warningScheduleText}>{children}</span>

    <Button onClick={onClick}>Fazer Novo Agendamento</Button>
  </div>
);
