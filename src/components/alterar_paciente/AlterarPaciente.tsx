import { useContext, useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import ibge from '../../services/ibge';
import api from '../../services/api';
import './AlterarPaciente.scss';
import { IbgeCidadesProps, IbgeEstadosProps } from '../../types';
import { PacienteContexts } from '../../contexts/pacientes_contexts';

const AlterarPaciente = () => {
    const { selectedPaciente, setPacientes} = useContext(PacienteContexts);
    const [uf, setUf ] = useState<string>('');
    const [estados, setEstados] = useState<IbgeEstadosProps[]>([]);
    const [cidades, setCidades] = useState<IbgeCidadesProps[]>([]);
    const [nome, setNome] = useState<string>(selectedPaciente ? selectedPaciente.nome : '');
    const [idade, setIdade] = useState<number>(selectedPaciente ? selectedPaciente.idade : 0);
    const [estado, setEstado] = useState<string>(selectedPaciente ? selectedPaciente.estado : '');
    const [cidade, setCidade] = useState<string>(selectedPaciente ? selectedPaciente.cidade : '');
    const navigate = useNavigate();

    const goToPage = (page: string) => {
        navigate(page);
    }

    useEffect(() => {
        ibge.get('/').then((res) => {
            const { data, status} = res;
            if(status === 200) {
                setEstados(data);
                if (selectedPaciente && selectedPaciente.estado) {
                    const estadoEncontrado = data.find((estado: IbgeEstadosProps) => estado.nome === selectedPaciente.estado);
                    if (estadoEncontrado) {
                        setUf(estadoEncontrado.sigla);
                    }
                }
            }
        });
    }, [selectedPaciente]);

    useEffect(() => {
        if(uf !== "") {
            ibge.get(`/${uf}/municipios`).then((res) => {
                const {data, status} = res;
                if(status === 200) {
                    setCidades(data);
                }
            });
        }
    }, [uf]);

    const atualizarPaciente = (e: React.FormEvent) => {
        e.preventDefault();

        if(nome.trim() === '' || idade === 0 || cidade.trim()  === '' || estado.trim()  === '') {
            alert("Por favor, preencha todos os campos!");
        } else {
            const data = {
                nome,
                idade,
                cidade,
                estado
            }
    
            api.put(`/atualizar-paciente/${selectedPaciente?._id}`, data).then((res) => {
                const {status} = res;
    
                if(status === 200) {
                    alert("Dados Atualizados");
                    api.get('/lista-pacientes').then((res) => {
                        const { data, status } = res;
                        if(status === 200) {
                            setPacientes(data);
                            goToPage('/pacientes');
                        }
                    });
                }
            })
        }

    }



    return(
        <>
            <ArrowLeftCircle className='voltar' onClick={() => goToPage('/pacientes')} />
            <h3>
                Alterar Paciente
            </h3>
            <Form className='form' onSubmit={atualizarPaciente}>
                <FloatingLabel label="Nome Completo" className='mb-3 inputs'>
                    <Form.Control 
                        type='text' 
                        placeholder='Nome Completo'
                        value={nome}
                        onChange={(e) => {setNome(e.target.value)}}
                    ></Form.Control>
                </FloatingLabel>

                <FloatingLabel label="Idade" className='mb-3 inputs'>
                    <Form.Control 
                        type='number' 
                        placeholder='Idade'
                        value={idade}
                        onChange={(e) => {setIdade(e.target.value ? Number(e.target.value) : 0)}}
                    ></Form.Control>
                </FloatingLabel>

                <FloatingLabel label="Estado" className='mb-3 inputs'>
                    <Form.Select
                        onChange={(e) => {
                            setUf(e.target.value);
                            setEstado(e.target.options[e.target.selectedIndex].text);
                        }}
                        value={uf}
                    >
                        <option value="">Selecione o estado</option>
                        {estados.map((estado) => (
                            <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel label="Cidade" className={`mb-3 inputs ${cidades.length === 0 ? 'disabled': ''}`}>
                    <Form.Select 
                        disabled={cidades.length === 0 ? true: false}
                        value={cidade}
                        onChange={(e) => {
                            setCidade(e.target.value)
                        }}
                    >
                        <option value="">Selecione a Cidade</option>
                        {cidades.map((cidade) => (
                            <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
                <div className='btn-container'>
                    <button className='btn btn-cadastrar' type='submit'>
                        Atualizar
                    </button>
                </div>

            </Form>
        </>
        


        
    )
}

export default AlterarPaciente;

