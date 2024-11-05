import CadastrarNovoPaciente from "../components/cadastrar_paciente/CadastrarNovoPaciente";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";


const CadastrarPaciente = () => (
    <>
        <Header />
        <main>
            <CadastrarNovoPaciente />
        </main>
        <Footer />
    </>
);

export default CadastrarPaciente;