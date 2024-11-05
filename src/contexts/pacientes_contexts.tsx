/* eslint-disable no-sequences */
import React from "react";
import { PacienteProps, PacienteContextProps } from "../types";


const initialValue = {
    paciente: undefined as PacienteProps[] | undefined,
    setPacientes: (newState: PacienteProps[]) => {},
}

export const PacienteContexts = React.createContext(initialValue);

export const PacienteContextProvider = ({ children }: PacienteContextProps) => {
    const [paciente, setPacientes] = React.useState<PacienteProps[] | undefined>(initialValue.paciente);

    

    return (
        <PacienteContexts.Provider value={
            {
                paciente,
                setPacientes
            }
        }>{children}</PacienteContexts.Provider>
    )
}