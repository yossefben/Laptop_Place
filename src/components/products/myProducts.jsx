import { getMyProducts } from "../../services/productsService";
import Header from "../common/header";
import MyProduct from "./commonProduct/myProduct";
import Items from "../common/items";
import { Link } from "react-router-dom";

class myProducts extends Items {
  state = { products: [] };

  async componentDidMount() {
    const { data } = await getMyProducts();

    if (data.length) {
      this.setState({ products: data });
    }
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <div className="mt-5 bg-warning bg-gradient">
          <Header title="My Products Page" />
          <div className="row mt-2">
            <span className="col-8 fst-italic fs-4">
              <i className="bi bi-card-list text-danger fs-3 mr-3 me-2 ms-3"></i>
              Your Products are listed below <br />
            </span>
            <div className="col-4">
              <span className="float-end ms-auto">
                <Link
                  to="./createProduct"
                  className="btn btn-info rounded-circle"
                >
                  <i className="bi bi-plus-circle"></i> Add New Product
                </Link>
              </span>
            </div>
          </div>
        </div>

        <form onChange={this.handleSearchProduct}>
          {this.renderInputSearch("search")}
        </form>

        <div className="row">
          {products.length ? (
            products.map((product) => (
              <MyProduct
                key={product._id}
                product={product}
                onDelete={() => this.handleDeleteProduct(product._id)}
              />
            ))
          ) : (
            <h2>No products yet....</h2>
          )}
        </div>
      </>
    );
  }
}

export default myProducts;
