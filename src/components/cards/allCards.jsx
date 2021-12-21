import { Redirect } from "react-router";
import { getAllCards } from "../../services/cardsService";
import { getCurrentUser } from "../../services/usersService";
import Card from "./commonCard/card";
import Header from "../common/header";
import Items from "../common/items";

class allCards extends Items {
  state = { cards: [], favCards: [] };

  async componentDidMount() {
    const { data } = await getAllCards();
    if (data.length) {
      this.setState({ cards: data });
    }
    console.log(data);
  }

  render() {
    if (!getCurrentUser()) {
      return <Redirect to="/signin" />;
    }
    const { cards } = this.state;
    console.log(cards);
    return (
      <>
        <div className="mt-5 bg-success bg-gradient">
          <Header title="All Cards" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="col-8 fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2 ms-3"></i>
                All Cards are listed below...
              </span>
            </div>
          </div>
        </div>

        <form onChange={this.handleSearchCard}>
          {this.renderInputSearch("search")}
        </form>
        <div className="row">
          {cards.length ? (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                addFav={() => this.handleAddFavCards(card._id)}
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
export default allCards;
