import { useContext, useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import api from "../services/api";

import { PacienteContexts } from "../contexts/pacientes_contexts";

const Home = () => {
    const { paciente, setPacientes} = useContext(PacienteContexts);

    useEffect(() => {
        api.get('/lista-pacientes').then((res) => {
            const { data, status } = res;
            if(status === 200) {
                setPacientes(data);
            }
        })
    }, [setPacientes]);

    useEffect(() => {
        console.log("aqui");
        console.log(paciente);
    }, [paciente]);
    
    return (
        <>
            <Header />
            <p>Home</p>
            <Footer />
        </>
    );
}

export default Home;