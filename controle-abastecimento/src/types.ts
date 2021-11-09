export type Login = {
    data: string;
    status: string;
}

export type User = {
    data: {
        apelido: string;
        ativo: string;
        cpf_cnpj: string;
        dtRegistro: string;
        email: string;
        id: string;
        senha: string;
        situacao: string;
        usuario: string;
        tel: string;
        cid: string;
        uf: string;
        cep: string;
    },
    status: string;
}


export type Vehicle = {
    id: number;
    apelido: string;
    placaVeiculo: string;
    nomeVeiculo: string;
    renavan: string;
    ano_fabric: string;
    ano_modelo: string;
    chassis: string;
    tpVeiculo: number;
    sit_financeira: string;
    sit_fiscal: string;
    sit_legal: string;
    sit_multa: string;
    sit_docto: string;
    temMovVeiAno: string;
    placaCidade: string;
    placaEstado: string;
    dtCompra: Date;
    dtVenda: number;
    kmCompra: number;
    kmVenda: number;
    kmAtual: number;
    codPessCompra: string;
    codPessVenda: string;
    obsVeiculo: string;
    dtRegistro: Date;
    situacao: string;
    ativo: string;
}


export type Histories = {
    ID: number;
    APELIDO: string;
    DTMovto: string;
    KMATUAL: number;
    LT: string;
    PLACA: string;
    PRTOTAL: string;
    PRUNIT: string;
    Percorrido: string;
}