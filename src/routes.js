import React from "react";
import Main from "./Main";
import WrappedNormalLoginForm from "./Login";
import {Switch,Route,BrowserRouter, Redirect} from 'react-router-dom';
import WrappedRegistrationForm from "./client-registration";
import ListaClient from "./lista-client";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('currentUser') !== null ? 
      (
        <Main {...props} >
          <Component {...props} />
          </Main>
      ): 
      (
        <Redirect to="/login" />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
  <Switch>
    <Route exact path="/login" component={WrappedNormalLoginForm} />
    <PrivateRoute path="/lista" key='lista' component={ListaClient}/>
    <PrivateRoute path="/client" key='client' component={WrappedRegistrationForm}/>
    <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
  </BrowserRouter>
);

export default Routes;
