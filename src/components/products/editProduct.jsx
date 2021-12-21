import Joi from "joi";
import Form from "../common/form";
import Header from "../common/header";
import { Redirect, Link } from "react-router-dom";
import { getCurrentUser } from "../../services/usersService";
import { editProduct, getProduct } from "../../services/productsService";
import { toast } from "react-toastify";

class EditProduct extends Form {
  state = {
    form: {
      productName: "",
      productDescription: "",
      productPrice: "",
      productCategory: "",
      userPhone: "",
      productImage: "",
    },
  };

  schema = {
    _id: Joi.string(),
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
    productImage: Joi.string().min(2).max(1024).uri().label("Image").allow(""),
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    const {
      data: {
        _id,
        productName,
        productDescription,
        productPrice,
        productCategory,
        userPhone,
        productImage,
      },
    } = await getProduct(id);

    this.setState({
      form: {
        _id,
        productName,
        productDescription,
        productPrice,
        productCategory,
        userPhone,
        productImage,
      },
    });
  }

  async doSubmit() {
    const { form: product } = this.state;
    console.log(product);
    await editProduct(product);
    toast("Product is updated...");
    this.props.history.replace("/products/myProducts");
  }
  render() {
    if (!getCurrentUser()) {
      return <Redirect to="/signin" />;
    }
    return (
      <>
        <div className="text-center mt-5">
          <Header title="Update your Product" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2"></i>
                You product can be updated <br />
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
          {this.renderInput("productImage", "Image")}

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

export default EditProduct;
