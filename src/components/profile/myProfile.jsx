import { Component } from "react";
import { getMyProfile } from "../../services/usersService";
import Header from "../common/header";
import { Link } from "react-router-dom";
import Profile from "./commonProfile/profile";

class MyProfile extends Component {
  state = { profile: {} };

  async componentDidMount() {
    const {
      data: { _id, firstname, lastname, email, phone },
    } = await getMyProfile();

    this.setState({
      profile: {
        _id,
        firstname,
        lastname,
        email,
        phone,
      },
    });
  }

  render() {
    const user = this.state.profile;
    console.log(user);
    return (
      <>
        <div className="text-center mt-5">
          <Header title="My Profile" />
          <div className="row mt-2">
            <div className="col-12">
              <span className="fst-italic fs-4">
                <i className="bi bi-file-person text-warning fs-3 mr-3 me-2"></i>
                Your details
              </span>
            </div>
          </div>

          <div className="row">
            <Profile user={user} />
          </div>

          <div>
            <Link
              to="/users/myProfile/editProfile"
              className="btn btn-warning rounded-circle mt-5"
            >
              <i className="bi bi-pencil " style={{ fontSize: 30 }}>
                Edit
              </i>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default MyProfile;
