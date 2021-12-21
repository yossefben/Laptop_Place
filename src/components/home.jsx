import Header from "./common/header";
import buySell from "../images/carrousel/buySell.jpg";
import keyboardColor from "../images/carrousel/keyboardColor.jpg";
import laptopCoffee from "../images/carrousel/laptopCoffee.jpg";
import timeToSell from "../images/carrousel/timeToSell.png";

const Home = () => {
  return (
    <>
      <Header title="Home Page" />
      <div className="row ms-1">
        <p>
          Laptop Place is a platform for buying and selling products, and for
          sharing works experiences.
          <br />
          Employees and managers can find you easily and understand what are you
          are doing.
          <br />
          All you need to do, is to register and create your account, and your
          business card if you are a business owner.
        </p>
      </div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={timeToSell}
                className="d-block w-50 mx-auto "
                alt="images1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={keyboardColor}
                className="d-block w-50 mx-auto"
                alt="images2"
              />
            </div>
            <div className="carousel-item">
              <img
                src={laptopCoffee}
                className="d-block w-50 mx-auto"
                alt="images3"
              />
            </div>
            <div className="carousel-item">
              <img
                src={buySell}
                className="d-block w-50 mx-auto"
                alt="images4"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
