
import { useContext } from "react";
import { PacienteContexts } from "./../../contexts/pacientes_contexts";
import PacienteItem from "../paciente_item/PacienteItem";

const ListaPacientes = () => {
    const { paciente } = useContext(PacienteContexts);


    return(
        <div className="pacientes-container">
            <h3>Pacientes</h3>
            {paciente?.map((p, index) => (
                <PacienteItem key={index} paciente={p} ></PacienteItem>
            ))}
        </div>
    )
}

export default ListaPacientes;