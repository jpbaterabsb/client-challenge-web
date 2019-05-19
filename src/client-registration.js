
import React from 'react';
import { cepService,clientService } from './service';
import InputMask from 'react-input-mask';
import 'antd/dist/antd.css';
import './index.css';
import jwtDecode from 'jwt-decode';

import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button
} from 'antd';

const { Option } = Select;
class RegistrationForm extends React.Component {

  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this);
    this.adicionarEmail = this.adicionarEmail.bind(this);
    this.removerEmail = this.removerEmail.bind(this);
    this.emails = this.emails.bind(this);
  }


  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    nome: null,
    cep: null,
    logradouro: null,
    localidade: null,
    uf: null,
    complemento: null,
    bairro: null,
    formItemLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

    },
    number: 1,
    emails: []
  };

  handleChange = e => {
    let obj = this.state;
    obj[e.target.name] = e.target.value
    this.props.form.setFieldsValue(obj);
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let request = {};
        request.nome = values.nome;
        request.responsavel = jwtDecode(JSON.parse(localStorage.getItem('currentUser')).data.token).user_id;
        request.email = [];
        request.telefone = [];
        request.endereco = {
          uf : values.uf,
          complemento : values.complemento,
          logradouro : values.logradouro,
          localidade : values.localidade,
          bairro : values.bairro,
        };


        let numeroTelefone;
        let chaves = Object.keys(values);
        for (const key in Object.keys(values)) {
          if (chaves[key].includes("email")) {
            let email ={};
            email.email = values[chaves[key]];
            request.email.push(email);
          }
        }

        

        numeroTelefone = values.telefone.replace('(','').replace(')','').replace('-','').replace(' ','');
        let cpf = values.cpf.replace('(','').replace(')','').replace('-','').replace('.','').replace('.','').replace(' ','');
        let cep = values.cep.replace('(','').replace(')','').replace('-','').replace('.','').replace(' ','');
        let telefone = {};
        telefone.numero = numeroTelefone;
        telefone.tipo =values.tipoTelefone;
        request.telefone.push(telefone);

        request.cep = cep;
        request.cpf = cpf;
       clientService.post(request).then(c => console.log(c));

      }

    }
    );
  };

  buscar() {
    let cep = this.props.form.getFieldValue('cep');
    cep = cep.replace('.', '');
    cep = cep.replace('-', '');
    console.log(this.state);
    cepService.buscarCep(cep).then(endereco => {
      this.props.form.setFieldsValue({
        cep: endereco.data.cep,
        logradouro: endereco.data.logradouro,
        localidade: endereco.data.localidade,
        uf: endereco.data.uf,
        complemento: endereco.data.complemento,
        bairro: endereco.data.bairro
      });

    }, error => alert("error"));
  }

  adicionarEmail() {
    ++this.state.number;
    this.props.form.setFieldsValue(this.state);
  }

  removerEmail() {
    --this.state.number;
    this.props.form.setFieldsValue(this.state);
  }

  emails() {
    const { getFieldDecorator } = this.props.form;
    let emails = [];
    let number = this.state.number;


    for (let i = 0; number > i; i++) {
      emails.push(<Form.Item label={`E-mail ${i + 1}`}>
        {getFieldDecorator(`email${i}`, {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
        })(<Input id={`email${i}`} initialValue="" />)}
      </Form.Item>);
    }

    return emails;
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = this.state.formItemLayout;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (


      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Nome" hasFeedback>
          {getFieldDecorator('nome', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu nome',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="CPF" hasFeedback>
          {getFieldDecorator('cpf', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu cpf',
              }
            ],
          })(<InputMask mask="999.999.999-99" />)}
        </Form.Item>
        <Form.Item label="CEP">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('cep', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(<InputMask mask="99.999-999" />)}
            </Col>
            <Col span={12}>
              <Button type="primary" htmlType="button" onClick={() => this.buscar()}>Buscar Cep</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="UF" hasFeedback>
          {getFieldDecorator('uf', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu nome',
              }
            ],
          })(<Input name="uf" onChange={this.handleChange} />)}
        </Form.Item>
        <Form.Item label="complemento" hasFeedback>
          {getFieldDecorator('complemento', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu nome',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="logradouro" hasFeedback>
          {getFieldDecorator('logradouro', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu nome',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="bairro" hasFeedback>
          {getFieldDecorator('bairro', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu nome',
              }
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="localidade" hasFeedback>
          {getFieldDecorator('localidade', {
            rules: [
              {
                required: true,
                message: 'Por favor insira seu nome',
              }
            ],
          })(<Input />)}
        </Form.Item>
        {this.emails()}
        <Form.Item {...tailFormItemLayout}>
          <Col span={4}>
            <Button type="primary" htmlType="button" onClick={this.adicionarEmail}>
              Adicionar +
          </Button>
          </Col>
          <Col span={16}>
            <Button type="primary" htmlType="button" onClick={this.removerEmail}>
              remover +
          </Button>
          </Col>
        </Form.Item>

        <Form.Item label="Telefone">
          <Row gutter={8}>
            <Col span={8}>
              {getFieldDecorator('telefone', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor insira seu telefone',
                  }
                ],
              })(<InputMask mask="(99) 9999-9999" />)}
            </Col>
            <Col span={12}>
              {getFieldDecorator('tipoTelefone', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor insira seu telefone',
                  }
                ],
              })(<Select defaultValue="CELULAR">
                <Option value="RESIDENCIAL">RESIDENCIAL</Option>
                <Option value="COMERCIAL">COMERCIAL</Option>
                <Option value="CELULAR">CELULAR</Option>
              </Select>)};
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
