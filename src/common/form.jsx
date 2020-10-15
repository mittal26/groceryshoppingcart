import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "../common/select";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
    };
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;
    //console.log(errors);
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSelectChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    //console.log(data, "xxxxx");
    this.setState({ data });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        value={data[name]}
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <div>
        <Select
          name={name}
          lable={label}
          options={options}
          onChange={this.handleSelectChange}
          error={errors[name]}
          value={data[name]}
        />
      </div>
    );
  }
}

export default Form;
