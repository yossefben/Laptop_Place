import { getMyCards } from "../../services/cardsService";
import MyCard from "./commonCard/myCard";
import Header from "../common/header";
import { Link } from "react-router-dom";
import Items from "../common/items";

class MyCards extends Items {
  state = { cards: [] };

  async componentDidMount() {
    const { data } = await getMyCards();

    if (data.length) {
      this.setState({ cards: data });
      console.log(data);
    }
  }

  render() {
    const { cards } = this.state;
    console.log(cards);
    return (
      <>
        <div className="mt-5" style={{ backgroundColor: "green" }}>
          <Header title="My Cards" />
          <div className="row mt-2">
            <span className="col-8 fst-italic fs-4">
              <i className="bi bi-card-list text-warning fs-3 mr-3 me-2 ms-3"></i>
              Your cards are listed below...
            </span>
            <div className="col-4">
              <span className="float-end ms-auto">
                <Link to="./createCard" className="btn btn-info rounded-circle">
                  <i className="bi bi-folder-plus"></i> Add New Card
                </Link>
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
              <MyCard
                key={card._id}
                card={card}
                onDelete={() => this.handleDeleteCard(card._id)}
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
export default MyCards;
