import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <Link to="/" className="navbar-brand text-warning square_btn" href>
          Laptop <i className="bi bi-laptop"></i> Place
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>

            {user && (
              <li className="nav-item dropdown">
                <NavLink
                  to="/"
                  className="nav-link dropdown-toggle"
                  href
                  id="dropdown04"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="dropdown04">
                  <li>
                    <Link to="/products/allProducts" className="dropdown-item">
                      All products
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/myProducts" className="dropdown-item">
                      My Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/myFavProducts"
                      className="dropdown-item"
                    >
                      My Favorites Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/createProduct"
                      className="dropdown-item"
                    >
                      Create product
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {user?.biz && (
              <li className="nav-item dropdown">
                <NavLink
                  to="/"
                  className="nav-link dropdown-toggle display-toggle-no-arrow"
                  href
                  id="dropdown04"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cards
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="dropdown04">
                  <li>
                    <Link to="/cards/allCards" className="dropdown-item">
                      All Cards
                    </Link>
                  </li>
                  <li>
                    <Link to="/cards/myCards" className="dropdown-item">
                      My Cards
                    </Link>
                  </li>
                  <li>
                    <Link to="/cards/myFavCards" className="dropdown-item">
                      My Favorites Cards
                    </Link>
                  </li>
                  <li>
                    <Link to="/cards/createCard" className="dropdown-item">
                      Create Card
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              aria-label="Search"
              disabled
            ></input>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {!user && (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-success btn-sm me-2 mt-2 ms-2 fw-bold boxin">
                    <NavLink to="/signin" className="nav-link">
                      Log In
                    </NavLink>
                  </button>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-success btn-sm me-2 mt-2 ms-2 fw-bold boxup">
                    <NavLink to="/signup" className="nav-link">
                      Sign Up
                    </NavLink>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-success btn-sm me-2 mt-2 fw-bold boxbiz">
                    <NavLink to="/signupBiz" className="nav-link">
                      Sign Up for Business
                    </NavLink>
                  </button>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item dropdown">
                  <button className="btn btn-outline-warning btn-sm text-primary mt-2 ms-2 fw-bold">
                    <NavLink
                      to="/"
                      className="nav-link dropdown-toggle"
                      style={{ color: "aqua" }}
                      href
                      id="dropdown04"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      {user.email}
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="dropdown04">
                      <li>
                        <Link to="/users/myProfile" className="dropdown-item">
                          My Profile
                        </Link>
                      </li>
                    </ul>
                  </button>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm text-primary mt-2 ms-2 fw-bold boxred">
                    <NavLink to="/logout" className="nav-link">
                      Log Out
                    </NavLink>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
