
import React from 'react';
import { cepService,clientService } from './service';
import 'antd/dist/antd.css';
import './index.css';

class ListaClient extends React.Component {

  constructor() {
    super()
    this.state = {response: []};
      }
 

  componentDidMount() {
    clientService.get().then(client =>{
      this.clientes(client.data);
      this.setState({response :client.data});
  });
  }


  clientes(response){
      console.log(response);
      return response.map(c => {
        return <tr key={c.id}>
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
          return <tr key={c.id}>
                <th scope="row">{c.id}</th>
                <td>{c.nome}</td>
                <td>{c.cpf}</td>
                <td>{c.telefone[0].numero}</td>
              </tr>
      })}
    </tbody>
</table>
    );
  }
}

export default ListaClient;
