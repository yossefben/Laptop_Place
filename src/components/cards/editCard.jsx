import Joi from "joi";
import Form from "../common/form";
import Header from "../common/header";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUser } from "../../services/usersService";
import { getCard, editCard } from "../../services/cardsService";
import { toast } from "react-toastify";

class EditCard extends Form {
  state = {
    form: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "054386788",
      bizImage: "",
    },
  };

  schema = {
    _id: Joi.string(),
    bizName: Joi.string().min(2).max(255).required().label("Name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Description"),
    bizAddress: Joi.string().min(2).max(400).required().label("Adress"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    bizImage: Joi.string().min(11).max(1024).uri().label("Image").allow(""),
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    const {
      data: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage },
    } = await getCard(id);

    this.setState({
      form: {
        _id,
        bizName,
        bizDescription,
        bizAddress,
        bizImage,
        bizPhone,
      },
    });
  }

  async doSubmit() {
    const { form: card } = this.state;
    await editCard(card);
    toast("Card is updated...");
    this.props.history.replace("/cards/myCards");
  }

  render() {
    if (!getCurrentUser()) {
      return <Redirect to="/signin" />;
    }
    return (
      <>
        <div className="text-center mt-5">
          <Header title="Update your Business Card" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2"></i>
                You card can be updated <br />
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
            <div className="mt-4 fw-bold">{this.renderButton("Save")}</div>
            <button
              className="btn btn-warning mt-4 fw-bold"
              style={{ height: "50px", width: "100px", margin: "" }}
            >
              <Link
                to="../"
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

export default EditCard;
