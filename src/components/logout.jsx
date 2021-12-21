import { Component } from "react";
import { logoutUser } from "../services/usersService";

class Logout extends Component {
  state = {};

  componentDidMount() {
    logoutUser();
    window.location = "/signin";
  }

  render() {
    return null;
  }
}

export default Logout;
