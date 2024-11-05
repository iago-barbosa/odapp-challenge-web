export type PacienteProps = {
    id: number,
    nome: string,
    idade: number,
    dataCadastro: Date,
    cidade: string,
    estado: string
}

export type PacienteContextProps =  {
    children: React.ReactNode;
}

export type IbgeEstadosProps = {
    id: number,
    sigla: string,
    nome: string
}

export type IbgeCidadesProps = {
    id: number,
    nome: string
}
