import Header from "./common/header";
import Form from "./common/form";
import Joi from "joi";
import { createUser } from "../services/usersService";
import { getCurrentUser } from "../services/usersService";
import { loginUser } from "../services/usersService";
import { Redirect } from "react-router-dom";

class SignupBiz extends Form {
  state = {
    form: {
      lastname: "userbb",
      firstname: "userbb",
      email: "userbb@gmail.com",
      password: "111111",
      phone: "053459403",
    },
  };

  schema = {
    lastname: Joi.string().required().min(2).label("Last Name"),
    firstname: Joi.string().required().min(2).label("First Name"),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
  };

  async doSubmit() {
    const { form } = this.state;
    const body = { ...form, biz: true };
    this.resetForm();

    try {
      const user = await createUser(body);
      await loginUser(body.email, body.password);
      window.location = "/";
      console.log(user);
    } catch (err) {
      const { response } = err;
      if (response) {
        console.log("error", {
          status: response.status,
          err: response.data.err,
        });
      }
      if (response && response.status === 400) {
        this.setState({
          errors: {
            email: response.data.err,
          },
        });
      }
    }
  }

  render() {
    if (getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="text-center mt-5">
          <Header title="Sign Up as a Business Member" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-door-open text-warning fs-3 mr-3 me-2"></i>
                Please create a new account
                <br />
                <span className="text-warning fs-6">(* fields required)</span>
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={this.handleSubmit}
          className="col-md-6 col-lg-4 mt-3"
          style={{ margin: "auto" }}
          autoComplete="off"
          noValidate
        >
          {this.renderInput("lastname", "Last Name", "text", true)}
          {this.renderInput("firstname", "First Name", "text", true)}
          {this.renderInput("email", "Email", "text", true)}
          {this.renderInput("password", "Password", "password", "text", true)}
          {this.renderInput("phone", "Phone", "text", true)}

          <div className="d-flex">
            <input
              type="button"
              value="reset"
              style={{ height: "50px", width: "100px", margin: "auto" }}
              className="btn btn-danger my-4 fw-bold"
              onClick={() => {
                this.resetForm();
              }}
            />
            <div className="mt-4 fw-bold" style={{ margin: "auto" }}>
              {this.renderButton("Sign Up")}
            </div>
          </div>
        </form>
      </>
    );
  }
}
export default SignupBiz;
