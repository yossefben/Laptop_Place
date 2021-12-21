// import { Component } from "react";
import { getMyFavCards } from "../../services/cardsService";
import FavCard from "./commonCard/favCard";
import Header from "../common/header";
import Items from "../common/items";

class MyFavCards extends Items {
  state = { favCards: [] };

  async componentDidMount() {
    const { data } = await getMyFavCards();

    if (data.length) {
      this.setState({ favCards: data });
      console.log(data);
    }
  }

  render() {
    const { favCards } = this.state;
    console.log(favCards);
    return (
      <>
        <div
          className="mt-5"
          style={{ backgroundColor: "greenyellow", color: "red" }}
        >
          <Header title="My Favorites Cards" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="col-8 fst-italic fs-4">
                <i className="bi bi-card-list text-warning fs-3 mr-3 me-2 ms-3"></i>
                All Favorites Cards are listed below...
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          {favCards.length ? (
            favCards.map((favCard) => (
              <FavCard
                key={favCard._id}
                card={favCard}
                onDelete={() => this.handleRemoveFavCard(favCard._id)}
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
export default MyFavCards;
