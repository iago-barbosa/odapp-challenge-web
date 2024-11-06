export type PacienteProps = {
    _id: number,
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

export type EstadoProps = {
    estado: string,
    pacientes: number,
    color: string
}

export type IdadeProps = {
    ateCinco: number,
    ateDez: number,
    ateQuinze: number,
    ateDezoito: number,
    ateVinteECinco: number,
    maior: number
}
