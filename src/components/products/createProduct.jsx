import Form from "../common/form";
import Joi from "joi";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUser } from "../../services/usersService";
import { createProduct } from "../../services/productsService";
import Header from "../common/header";
import { toast } from "react-toastify";

class CreateProduct extends Form {
  state = {
    form: {
      productName: "bb",
      productDescription: "bb",
      productPrice: "100",
      productCategory: "bb",
      userPhone: "054378495",
      productImage: "",
    },
  };

  schema = {
    productName: Joi.string().min(2).max(255).required().label("Name"),
    productDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Description"),
    productPrice: Joi.number().min(1).required().label("Price"),
    productCategory: Joi.string().min(2).max(100).required().label("Category"),
    userPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    productImage: Joi.string().min(11).max(1024).uri().label("Image").allow(""),
  };

  async doSubmit() {
    const {
      form: { productImage, ...body },
    } = this.state;
    console.log(this.state);
    if (productImage) {
      body.productImage = productImage;
    }
    try {
      await createProduct(body);
      toast.success("Your product is registered 👌", {
        position: "top-center",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.history.push("/products/myProducts");
      console.log("product Register", this.state.form);
    } catch (err) {
      const { response } = err;
      if (response) {
        console.log("error", {
          status: response.status,
          err: response.data,
        });
      }
      if (response && response.status === 401) {
        this.props.history.replace("/logout");
      }
      if (response && response.status === 400) {
        this.setState({ errors: { bizImage: response.data.message } });
      }
    }
  }

  render() {
    if (!getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="text-center mt-5">
          <Header title="Create your Product" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2"></i>
                Very simple to create a Product <br />
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
          {this.renderInput("productName", "Name", "text", true)}
          {this.renderInput("productDescription", "Description", "text", true)}
          {this.renderInput("productPrice", "Price", "text", true)}
          {this.renderInput("productCategory", "Category", "text", true)}
          {this.renderInput("userPhone", "Phone user", "text", true)}
          {this.renderInput("productImage", "Image ")}

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
                to="./myProducts"
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

export default CreateProduct;
