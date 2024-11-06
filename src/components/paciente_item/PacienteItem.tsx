import { useContext, useState } from 'react';
import './PacienteItem.scss';
import { format } from 'date-fns';
import { ChevronDown, PencilSquare, Trash } from 'react-bootstrap-icons';
import api from '../../services/api';
import { PacienteProps } from '../../types';
import { PacienteContexts } from '../../contexts/pacientes_contexts';
import { useNavigate } from 'react-router-dom';

const PacienteItem = (props: any) => {
    const {
        paciente
    } = props
    const { setSelectedPaciente, setPacientes } = useContext(PacienteContexts);
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const editar = (paciente: PacienteProps) => {
        setSelectedPaciente(paciente);

        navigate('/editar-paciente');
    }

    const deletar = (id: number) => {
        api.delete(`/deletar-paciente/${id}`).then((res) => {
            const {data, status} = res;

            if(status === 200) {
                alert(data.message);
                api.get('/lista-pacientes').then((res) => {
                    const { data, status } = res;
                    if(status === 200) {
                        setPacientes(data);
                    }
                })
            }
        })
    }

    return (
        <div className="paciente-item">
            <div className='paciente-name'  onClick={() => setOpen(!isOpen)}>
                <h3>{paciente.nome}</h3>
                <ChevronDown className={`btn-chevron ${isOpen ? 'up' : ''}`} />
            </div>
            <div className={`paciente-info ${isOpen ? 'open': ''}`}>
                <p>Idade: {paciente.idade}</p>
                <p>Cidade: {paciente.cidade}</p>
                <p>Estado: {paciente.estado}</p>
                <p>Data de Cadastro: {format(new Date(paciente.dataCadastro), 'dd/MM/yyyy')}</p>
            </div>
            <div className='paciente-actions'>
                <button className='btn btn-edit' onClick={() => editar(paciente)}><PencilSquare/> Editar</button>
                <button className='btn btn-danger' onClick={() => deletar(paciente._id)}><Trash />Deletar</button>
            </div>
        </div>
    );
}

export default PacienteItem;