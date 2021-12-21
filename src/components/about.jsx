import Header from "./common/header";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Header title="About Laptop Place" />

      <div className="row ms-1">
        <div className="col-8 mt-5">
          <div>
            Laptop Place in webSite where you can sell and/or by Laptop Product.
            But it is also a place to to know companies and look for work
            <ul className="mt-3">
              If you are only want to buy/sell, you just have to create an
              account by clicking on{" "}
              <Link to="/signup" className="text-warning">
                <span className="fw-bold">
                  <u> "Sign Up"</u>
                </span>
              </Link>
              {", "}
              and to fill in your details.
            </ul>
            <ul>
              If you are a business owner, you just have to create a Business
              account by clicking on{" "}
              <Link to="/signupbiz" className="text-warning">
                <span className="fw-bold">
                  <u> "Sign Up for Business"</u>
                </span>
              </Link>
              {", "}
              to fill in your details and to create a business card.
            </ul>
          </div>
          <h3 className="mt-5">Go and Sign Up!</h3>
        </div>
      </div>
    </>
  );
};

export default About;
