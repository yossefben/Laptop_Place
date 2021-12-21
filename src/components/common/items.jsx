import { Component } from "react";
import {
  addFavProduct,
  deleteProduct,
  RemoveFavProduct,
  searchProducts,
} from "../../services/productsService";
import {
  addFavCard,
  deleteCard,
  RemoveFavCard,
  searchCards,
} from "../../services/cardsService";
import { toast } from "react-toastify";
import InputSearch from "../common/inputSearch";

class Items extends Component {
  handleChange = ({ target }) => {
    const { search } = this.state;

    this.setState({
      search: {
        ...search,
        [target.name]: target.value,
      },
    });
  };

  handleDeleteCard = async (id) => {
    await deleteCard(id);

    const { cards } = this.state;
    this.setState({
      cards: cards.filter((card) => card._id !== id),
    });
    toast("Card deleted");
  };

  handleDeleteProduct = async (id) => {
    await deleteProduct(id);

    const { products } = this.state;
    this.setState({
      products: products.filter((product) => product._id !== id),
    });
    toast("Product deleted");
  };

  handleAddFavCards = async (id) => {
    const { favCards } = this.state;
    await addFavCard(id);
    this.setState({ favCards });
    toast("Card in your favorite");
  };

  handleAddFavProducts = async (id) => {
    const { favProducts } = this.state;
    await addFavProduct(id);
    this.setState({ favProducts });
    toast("Product in your favorite");
  };

  handleRemoveFavCard = async (id) => {
    await RemoveFavCard(id);
    const { favCards } = this.state;
    this.setState({
      favCards: favCards.filter((favCard) => favCard._id !== id),
    });
    toast("Card deleted");
  };

  handleRemoveFavProduct = async (id) => {
    await RemoveFavProduct(id);
    const { favProducts } = this.state;
    this.setState({
      favProducts: favProducts.filter((favProduct) => favProduct._id !== id),
    });
    toast("Card deleted");
  };

  renderInputSearch() {
    const { search } = this.state;
    return <InputSearch onChange={this.handleChange} value={search} />;
  }

  handleSearchCard = async (e) => {
    const { data } = await searchCards(e.target.value);
    if (!data.length) {
      <p></p>;
    }
    return this.setState({ cards: data });
  };

  handleSearchProduct = async (e) => {
    const { data } = await searchProducts(e.target.value);
    if (!data.length) {
      <p></p>;
    }
    return this.setState({ products: data });
  };
}
export default Items;
