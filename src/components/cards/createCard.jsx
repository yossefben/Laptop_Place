import Joi from "joi";
import Form from "../common/form";
import Header from "../common/header";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUser } from "../../services/usersService";
import { createCard } from "../../services/cardsService";
import { toast } from "react-toastify";

class CreateCard extends Form {
  state = {
    form: {
      bizName: "bb",
      bizDescription: "bb",
      bizAddress: "bb",
      bizPhone: "054386788",
      bizImage: "",
    },
  };

  schema = {
    bizName: Joi.string().uppercase().min(2).max(29).required().label("Name"),
    bizDescription: Joi.string().min(2).max(40).required().label("Description"),
    bizAddress: Joi.string().min(2).max(400).required().label("Adress"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    bizImage: Joi.string().min(11).max(1024).uri().label("Image").allow(""),
  };

  async doSubmit() {
    const {
      form: { bizImage, ...body },
    } = this.state;
    if (bizImage) {
      body.bizImage = bizImage;
    }
    try {
      await createCard(body);
      toast.success("Your card is registered 👌", {
        position: "top-center",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.history.push("/cards/myCards");
      console.log("Card Register", this.state.form);
    } catch (err) {
      const { response } = err;
      if (response) {
        console.log("error", {
          status: response.status,
          err: response.data.message,
        });
      }
      if (response && response.status === 400) {
        this.setState({ errors: { bizImage: response.data.message } });
      }
    }
  }

  render() {
    if (!getCurrentUser()) {
      return <Redirect to="/signin" />;
    }
    return (
      <>
        <div className="text-center mt-5">
          <Header title="Create your Business Card" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2"></i>
                Very simple to create a card <br />
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
          {this.renderInput("bizName", "Name", "text", true)}
          {this.renderInput("bizDescription", "Description", "text", true)}
          {this.renderInput("bizAddress", "Address", "text", true)}
          {this.renderInput("bizPhone", "Phone", "text", true)}
          {this.renderInput("bizImage", "Image ")}

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

            <div className="mt-4 fw-bold">{this.renderButton("Create")}</div>
            <button
              className="btn btn-warning mt-4 fw-bold"
              style={{ height: "50px", width: "100px", margin: "" }}
            >
              <Link
                to="./myCards"
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

export default CreateCard;
