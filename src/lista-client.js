
import React from 'react';
import ReactDOM from 'react-dom';
import { cepService,clientService } from './service';
import InputMask from 'react-input-mask';
import 'antd/dist/antd.css';
import './index.css';
import jwtDecode from 'jwt-decode';

class ListaClient extends React.Component {

  constructor() {
    super()
    this.state = {response: []};
    clientService.get().then(client =>{
        this.clientes(client.data);
        this.setState({response :client.data});
    });
  }
 

  componentDidMount() {
      
  }


  clientes(response){
      console.log(response);
      return response.map(c => {
        return <tr>
        <th scope="row">{c.id}</th>
        <td>{c.nome}</td>
        <td>{c.cpf}</td>
        <td>{c.telefone.numero}</td>
      </tr>
    });
  }


  render() {

    return (
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nome</th>
      <th scope="col">CPF</th>
      <th scope="col">Telefone</th>
    </tr>
  </thead>
  <tbody>
        {this.state.response.map(c => {
        return <tr>
        <th scope="row">{c.id}</th>
        <td>{c.nome}</td>
        <td>{c.cpf}</td>
        <td>{c.telefone.numero}</td>
      </tr>
    })}
  </tbody>
</table>
    );
  }
}

export default ListaClient;
