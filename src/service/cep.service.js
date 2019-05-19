import axios from 'axios';

export const cepService = {
    buscarCep
};

function buscarCep(cep) {
    return axios.get(`http://viacep.com.br/ws/${cep}/json/ `);
}
