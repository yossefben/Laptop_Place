import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import allCards from "./components/cards/allCards";
import CreateCard from "./components/cards/createCard";
import EditCard from "./components/cards/editCard";
import MyCards from "./components/cards/myCards";
import myFavCards from "./components/cards/myFavCards";

import CreateProduct from "./components/products/createProduct";
import allProducts from "./components/products/allProducts";
import EditProduct from "./components/products/editProduct";
import myProducts from "./components/products/myProducts";
import myFavProducts from "./components/products/myFavProducts";

import EditProfile from "./components/profile/editProfile";
import MyProfile from "./components/profile/myProfile";

import Header from "./components/common/header";
import ProtectedRoute from "./components/common/protectedRoute";

import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Logout from "./components/logout";
import Signin from "./components/signin";
import Signup from "./components/signup";
import SignupBiz from "./components/signupbiz";

import { getCurrentUser } from "./services/usersService";
import pageNotFound from "./images/carrousel/pageNotFound.jpg";

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      user: getCurrentUser(),
    });
  }
  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div className="App d-flex flex-column min-vh-100 bcg text-light">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container flex-fill">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signupBiz" component={SignupBiz} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/users/myProfile" component={MyProfile} exact />
            <Route
              path="/users/myProfile/editProfile"
              component={EditProfile}
              exact
            />
            <Route path="/pageNotFound" exact>
              <Header title="404 - Page Not Found" />
              <img
                src={pageNotFound}
                className="img-fluid d-block w-50 mx-auto"
                alt="images3"
              />
            </Route>

            <ProtectedRoute
              path="/cards/allcards"
              component={allCards}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/cards/createCard"
              component={CreateCard}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/cards/myCards"
              component={MyCards}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/cards/myCards/edit/:id"
              component={EditCard}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/cards/myFavCards"
              component={myFavCards}
              biz={true}
              exact
            />
            <ProtectedRoute
              path="/products/allProducts"
              component={allProducts}
              exact
            />
            <ProtectedRoute
              path="/products/createProduct"
              component={CreateProduct}
              exact
            />
            <ProtectedRoute
              path="/products/myProducts"
              component={myProducts}
              exact
            />
            <ProtectedRoute
              path="/products/myProducts/edit/:id"
              component={EditProduct}
              exact
            />
            <ProtectedRoute
              path="/products/myFavProducts"
              component={myFavProducts}
              exact
            />
            <Redirect to="/pageNotFound" />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
export default App;
