import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: "", name: "", password: "" },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    name: Joi.string().required().min(5).label("Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //Call Server
    //console.log("Submitted");
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("name", "Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
