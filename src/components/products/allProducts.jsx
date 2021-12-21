import { getAllProducts } from "../../services/productsService";
import Header from "../common/header";
import Items from "../common/items";
import Product from "./commonProduct/product";

class allProducts extends Items {
  state = { products: [] };

  async componentDidMount() {
    const { data } = await getAllProducts();

    if (data.length) {
      this.setState({ products: data });
    }
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <div className="mt-5 bg-warning bg-gradient">
          <Header title="All Products Page" />
          <div className="row mt-2">
            <span className="col-8 fst-italic fs-4">
              <i className="bi bi-card-list text-danger fs-3 mr-3 me-2 ms-3"></i>
              All Products are listed below <br />
            </span>
          </div>
        </div>

        <form onChange={this.handleSearchProduct}>
          {this.renderInputSearch("search")}
        </form>

        <div className="row">
          {products.length ? (
            products.map((product) => (
              <Product
                key={product._id}
                product={product}
                addFav={() => this.handleAddFavProducts(product._id)}
              />
            ))
          ) : (
            <h3 className="mt-5">No products yet....</h3>
          )}
        </div>
      </>
    );
  }
}

export default allProducts;
