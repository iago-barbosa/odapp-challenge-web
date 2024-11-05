import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CadastrarNovoPaciente.scss';
import ibge from '../../services/ibge';
import api from '../../services/api';
import { IbgeCidadesProps, IbgeEstadosProps } from '../../types';

const CadastrarNovoPaciente = () => {
    const [uf, setUf ] = useState<string>('');
    const [estados, setEstados] = useState<IbgeEstadosProps[]>([]);
    const [cidades, setCidades] = useState<IbgeCidadesProps[]>([]);
    const [nome, setNome] = useState<string>('');
    const [idade, setIdade] = useState<number>(0);
    const [estado, setEstado] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const navigate = useNavigate();

    const goToPage = (page: string) => {
        navigate(page);
    }

    useEffect(() => {
        ibge.get('/').then((res) => {
            const { data, status} = res;
            if(status === 200) {
                setEstados(data);
            }
        });
    }, []);

    useEffect(() => {
        if(uf !== "") {
            ibge.get(`/${uf}/distritos`).then((res) => {
                const {data, status} = res;
                if(status === 200) {
                    setCidades(data);
                }
            });
        }
    }, [uf]);

    const cadastrarPaciente = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            nome,
            idade,
            cidade,
            estado
        }

        api.post('/novo-paciente', data).then((res) => {
            const {status} = res;

            if(status === 201) {
                alert("Dados Cadastrados");
                goToPage("/")
            }
        })

    }



    return(
        <>
            <h3>
                Cadastrar Paciente
            </h3>
            <Form className='form' onSubmit={cadastrarPaciente}>
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
                        Realizar Cadastro
                    </button>
                </div>

            </Form>
        </>
        


        
    )
}

export default CadastrarNovoPaciente;

