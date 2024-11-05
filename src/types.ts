export type PacienteProps = {
    id: Number,
    nome: String,
    idade: Number,
    dataCadastro: Date,
    cidade: String,
    estado: String
}

export type PacienteContextProps =  {
    children: React.ReactNode;
}