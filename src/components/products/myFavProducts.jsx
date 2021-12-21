// import { Component } from "react";
import { getMyFavProducts } from "../../services/productsService";
import FavProduct from "./commonProduct/favProduct";
import Header from "../common/header";
import Items from "../common/items";

class MyFavProducts extends Items {
  state = { favProducts: [] };

  async componentDidMount() {
    const { data } = await getMyFavProducts();

    if (data.length) {
      this.setState({ favProducts: data });
      console.log(data);
    }
  }

  render() {
    const { favProducts } = this.state;
    console.log(favProducts);
    return (
      <>
        <div
          className="mt-5"
          style={{ backgroundColor: "yellow", color: "red" }}
        >
          <Header title="My Favorites Products" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="col-8 fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2 ms-3"></i>
                All Favorites Products are listed below...
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          {favProducts.length ? (
            favProducts.map((favProduct) => (
              <FavProduct
                key={favProduct._id}
                product={favProduct}
                onDelete={() => this.handleRemoveFavProduct(favProduct._id)}
              />
            ))
          ) : (
            <h3 className="mt-5">No cards yet...</h3>
          )}
        </div>
      </>
    );
  }
}
export default MyFavProducts;
