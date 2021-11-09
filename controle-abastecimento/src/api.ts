
import axios from "axios";
var base_url = "http://177.86.124.22/tcc-api/public_html/api"

export function fetchLogin(user: string, pwd: string) {
    return axios({
        method: 'POST',
        url: `${base_url}/consultas/verificauser`,
        data: `apelido=${user}&senha=${pwd}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function fetchUser(id: any) {
    return axios.get(`${base_url}/user/id=${id}`)
}

export function getVehicleByUser(apelido: string) {
    return axios.get(`${base_url}/veiculo/apelido=${apelido}/getlista=all`)
}

export function postUser(user: any, pwd: any, mail: any, name: any, telefone: any, cpf_cnpj: any, cep: any, cidade: any, uf: any) {
    return axios({
        method: 'POST',
        url: `${base_url}/user`,
        data: `apelido=${user}&usuario=${name}&email=${mail}&senha=${pwd}&cpf_cnpj=${cpf_cnpj}&tel=${telefone}&cep=${cep}&cid=${cidade}&uf=${uf}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function postVehicle(apelido: any, nomevehicle: any, placa: any, ano: any, nchassis: any, renavan: any, radio: any) {
    return axios({
        method: 'POST',
        url: `${base_url}/veiculo`,
        data: `apelido=${apelido}&placaVeiculo=${placa}&nomeVeiculo=${nomevehicle}&renavan=${renavan}&ano_fabric=${ano}&chassis=${nchassis}&tpVeiculo=${radio}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function searchVehicle(placa: string) {
    return axios.get(`${base_url}/veiculo/apelido=robert/placa=${placa}`)
}

export function searchHistory(user: string, placa: string, dataDe: any, dataAte: any) {
    return axios.get(`${base_url}/movto/apelido=${user}/periodo=${dataDe}ate${dataAte}/historico/placa=${placa}`)
}

export function postFuelVehicle(user: any, placa: any, pr_unit: any, qtde: any, kmatual: any, vlabastecido: any, dtMovto: any) {
    return axios({
        method: "POST",
        url: `${base_url}/movto`,
        data: `apelido=${user}&dtMovto=${dtMovto}&placaVeiculo=${placa}&kmVeiculo=${kmatual}&kmMovto=${kmatual}&qtde=${qtde}&pr_unit=${pr_unit}&pr_total=${vlabastecido}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function searchUserById(id: number) {
    return axios.get(`${base_url}/user/id=${id}`)
}

export function updateUser(id: any, apelido: any, name: any, telefone: any, cidade: any, uf: any, email: any) {
    return axios({
        method: "PUT",
        url: `${base_url}/user/apelido=${apelido}/id=${id}/tel=${telefone}/cid=${cidade}/uf=${uf}/usuario=${name}/email=${email}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export function desactiveCar(apelido: any, id: any) {
    return axios({
        method: 'DELETE',
        url: `${base_url}/veiculo/apelido=${apelido}/id=${id}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

}

export function updateCar(apelido: any, carId: any, chassi: any, renavan: any, obs: any) {
    return axios({
        method: "PUT",
        url: `${base_url}/veiculo/apelido=${apelido}/id=${carId}/chassis=${chassi}/renavan=${renavan}/obsVeiculo=${obs}`,
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

}