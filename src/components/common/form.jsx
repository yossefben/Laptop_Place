import React, { Component } from "react";
import Input from "./input";
import Joi from "joi";
import { uploadFile } from "../../services/productsService";

class Form extends Component {
  validateForm = () => {
    const {
      schema,
      state: { form },
    } = this;

    const { error } = Joi.object(schema).validate(form, { abortEarly: false });

    if (!error) {
      return null;
    }
    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    console.log(error);
    return errors;
  };

  validateInput = ({ name, value }) => {
    const data = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    const { error } = schema.validate(data);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ target }) => {
    const { form, errors } = this.state;

    console.log(this.validateForm());

    this.setState({
      form: {
        ...form,
        [target.name]: target.value,
      },

      errors: {
        ...errors,
        [target.name]: this.validateInput(target),
      },
    });
  };

  handleUploadFile = async (e) => {
    const { data } = await uploadFile(e.target.files[0]);
    if (!data.length) {
      <p></p>;
    }
    return this.setState({ productImage: [data] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      return null;
    }

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <>
        <button
          disabled={this.validateForm()}
          className="btn btn-primary fw-bold"
          style={{ height: "50px", width: "100px" }}
        >
          {label}
        </button>
      </>
    );
  }

  renderInput(name, label, type = "text", required = false) {
    const { form, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        onChange={this.handleChange}
        value={form[name]}
        error={errors && errors[name]}
        required={required}
      />
    );
  }

  resetForm = () => {
    const { form } = this.state;
    const updtatedForm = {};
    for (const key in form) {
      updtatedForm[key] = "";
      this.setState({ form: updtatedForm });
    }
  };
}

export default Form;
