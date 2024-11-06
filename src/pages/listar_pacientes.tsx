import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ListaPacientes from "../components/lista_pacientes/ListaPacientes";


const ListarPacientes = () => (
    <>
        <Header />
        <main>
            <ListaPacientes />
        </main>
        <Footer />
    </>
);

export default ListarPacientes;