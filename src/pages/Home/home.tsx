import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import api from "../../services/api";
import { PacienteContexts } from "../../contexts/pacientes_contexts";
import { EstadoProps, IdadeProps, PacienteProps } from "../../types";
import EstadoChart from "../../components/estados_chart/EstadosChart";
import IdadesChart from "../../components/idades_chart/IdadesChart";
import './home.scss';


const Home = () => {
    const { paciente, setPacientes} = useContext(PacienteContexts);
    const estadosObject: Record<string, number> = {};
    const [qtdPacientes, setQtdPacientes] = useState<number>(0);
    const [dadosEstado, setDadosEstado] = useState<EstadoProps[]>([]);
    const [dadosIdade, setDadosIdade] = useState<IdadeProps>({
        ateCinco: 0,
        ateDez: 0,
        ateQuinze: 0,
        ateDezoito: 0,
        ateVinteECinco: 0,
        maior: 0
    });

    useEffect(() => {
        setQtdPacientes(paciente ? paciente.length: 0);
    },[paciente]);

    useEffect(() => {
        api.get('/lista-pacientes').then((res) => {
            const { data, status } = res;
            if(status === 200) {
                setPacientes(data);

                let idades:IdadeProps = {
                    ateCinco: 0,
                    ateDez: 0,
                    ateQuinze: 0,
                    ateDezoito: 0,
                    ateVinteECinco: 0,
                    maior: 0
                }

                data.forEach((paciente: PacienteProps) => {
                    estadosObject[paciente.estado] = (estadosObject[paciente.estado] || 0) + 1;

                    if(paciente.idade <= 5) {
                        idades.ateCinco++
                    } else if(paciente.idade <=10) {
                        idades.ateDez++;
                    } else if(paciente.idade <=15) {
                        idades.ateQuinze++;
                    } else if(paciente.idade <=18) {
                        idades.ateDezoito++;
                    } else if(paciente.idade <=25) {
                        idades.ateVinteECinco++;
                    } else {
                        idades.maior++;
                    }
                });

                setDadosEstado(Object.entries(estadosObject).map(([estado, pacientes]) => ({
                    estado,
                    pacientes,
                    color: ''
                })));

                setDadosIdade(idades);
            }
        })
    }, [setPacientes]);
    
    return (
        <>
            <Header />
            <main className="home">
                <div className="dados-container">
                    <h3>Pacientes Cadastrados: {qtdPacientes}</h3>
                    <h3>Estados Alcançados: {dadosEstado.length}</h3>
                </div>
                <div className="charts-container">
                    <EstadoChart dadosEstados={dadosEstado} />
                    <IdadesChart dadosIdade={dadosIdade}/>
                </div>
            </ main>
            <Footer />
        </>
    );
}

export default Home;