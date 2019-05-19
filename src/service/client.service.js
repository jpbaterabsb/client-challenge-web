import axios from 'axios';

export const clientService = {
    post,get
};

function post(client) {
    let config = {
        headers: {
          Authorization : 'Bearer '+JSON.parse(localStorage.getItem('currentUser')).data.token,
        }
      }
      
    console.log(client);
    return axios.post(`http://localhost:8080/cliente`,client,config);
}

function get() {
    let config = {
        headers: {
          Authorization : 'Bearer '+JSON.parse(localStorage.getItem('currentUser')).data.token,
        }
      }
      

    return axios.get(`http://localhost:8080/cliente`,config);
}
