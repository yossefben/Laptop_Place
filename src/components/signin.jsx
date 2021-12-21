import Header from "./common/header";
import Form from "./common/form";
import Joi from "joi";
import { loginUser } from "../services/usersService";
import { getCurrentUser } from "../services/usersService";
import { Redirect } from "react-router-dom";

class Signin extends Form {
  state = {
    form: {
      email: "user@gmail.com",
      password: "111111",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  async doSubmit() {
    const { email, password } = this.state.form;
    this.resetForm();
    try {
      await loginUser(email, password);
      const to = this.props.location.state?.from?.pathname ?? "/";
      window.location = to;
      console.log(this.state.form);
    } catch (err) {
      console.log(err);
      const { response } = err;
      if (response) {
        console.log("error", {
          status: response.status,
          err: response.data.message,
        });
      }
      if (response && response.status === 400) {
        this.setState({
          errors: {
            email: response.data.message,
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
          <Header title="Please log in" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-door-open text-warning fs-3 mr-3 me-2"></i>
                Enter your details to access to your account
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
          {this.renderInput("email", "Email", "text", true)}
          {this.renderInput("password", "Password", "password", "text", true)}

          <div
            className="col-md-6 col-lg-4 d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <input
              type="button"
              value="Reset"
              style={{ height: "50px", width: "100px", margin: "auto" }}
              className="btn btn-danger my-4 fw-bold"
              onClick={() => {
                this.resetForm();
              }}
            />
            <div className="mt-4 fw-bold a" style={{ margin: "auto" }}>
              {this.renderButton("Sign In")}
            </div>

            <input
              type="button"
              value="For Sign Up"
              style={{ height: "50px", width: "100px", margin: "auto" }}
              className="btn btn-warning btn-sm my-4 fw-bold"
              onClick={() => {
                this.props.history.replace("/signup");
              }}
            />
          </div>
        </form>
      </>
    );
  }
}
export default Signin;
