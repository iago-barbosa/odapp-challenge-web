import { useState } from 'react';
import './PacienteItem.scss';
import { format } from 'date-fns';
import { ChevronDown, PencilSquare, Trash } from 'react-bootstrap-icons';
import api from '../../services/api';

const PacienteItem = (props: any) => {
    const {
        paciente
    } = props

    const [isOpen, setOpen] = useState(false);

    const deletar = (id: number) => {
        api.delete(`/deletar-paciente/${id}`).then((res) => {
            const {data, status} = res;

            if(status === 200) {
                alert(data.message);
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
                <button className='btn btn-edit'><PencilSquare/> Editar</button>
                <button className='btn btn-danger' onClick={() => deletar(paciente._id)}><Trash />Deletar</button>
            </div>
        </div>
    );
}

export default PacienteItem;