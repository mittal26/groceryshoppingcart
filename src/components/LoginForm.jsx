import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { username: "", password: "" },
      errors: {},
    };
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //Call Server
    try {
      //console.log("Submitted");
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
