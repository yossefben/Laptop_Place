import Joi from "joi";
import Form from "../common/form";
import Header from "../common/header";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUser } from "../../services/usersService";
import { getMyProfile } from "../../services/usersService";
import { editUser } from "../../services/usersService";
import { toast } from "react-toastify";

class EditProfile extends Form {
  state = {
    form: {
      lastname: "",
      firstname: "",
      phone: "054378497",
    },
  };

  schema = {
    _id: Joi.string(),
    lastname: Joi.string().required().min(2).label("Last Name"),
    firstname: Joi.string().required().min(2).label("First Name"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    const {
      data: { _id, lastname, firstname, phone },
    } = await getMyProfile(id);

    this.setState({
      form: {
        _id,
        lastname,
        firstname,
        phone,
      },
    });
  }

  async doSubmit() {
    const { form: profile } = this.state;
    try {
      await editUser(profile);
      toast("Profile is updated...");
      this.props.history.replace("/users/myProfile");
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
            firstname: response.data.message,
          },
        });
      }
    }
  }

  render() {
    if (!getCurrentUser()) {
      return <Redirect to="/logout" />;
    }
    return (
      <>
        <div className="text-center mt-5">
          <Header title="Update your Profile" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2"></i>
                You profile can be updated <br />
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
          {this.renderInput("phone", "Phone", "text", true)}

          <div
            className="col-md-6 col-lg-4 d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <div>
              <input
                type="button"
                value="Reset"
                style={{ height: "50px", width: "100px" }}
                className="btn btn-danger mt-4 fw-bold"
                onClick={() => {
                  this.resetForm();
                }}
              />
            </div>
            <div className="mt-4 fw-bold">{this.renderButton("Save")}</div>
            <button
              className="btn btn-warning mt-4 fw-bold"
              style={{ height: "50px", width: "100px", margin: "" }}
            >
              <Link
                to="/users/myProfile"
                className="text-light"
                style={{
                  height: "50px",
                  width: "100px",
                  textDecoration: "none",
                }}
              >
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default EditProfile;
