import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'
import { authenticationService } from "./service";

class Login extends React.Component {

  constructor(props) {
    super(props);
  }


  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        authenticationService.login(this.state.username,this.state.password);
        this.props.history.push("/app");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button> 
            </Form.Item>
          </Form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;