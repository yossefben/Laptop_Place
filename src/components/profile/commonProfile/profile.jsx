const user = ({ user }) => {
  return (
    <>
      <div
        className="card col-md-6 col-lg-4 mt-3 text-start"
        style={{ margin: "auto", width: "18rem" }}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="text-uppercase fw-bold text-decoration-underline">
              Last Name
            </span>{" "}
            : {user.lastname}
          </li>
          <li className="list-group-item">
            <span className="text-uppercase fw-bold text-decoration-underline">
              Fist Name
            </span>{" "}
            : {user.firstname}
          </li>
          <li className="list-group-item">
            <span className="text-uppercase fw-bold text-decoration-underline">
              Email
            </span>{" "}
            : {user.email}{" "}
          </li>
          <li className="list-group-item">
            <span className="text-uppercase fw-bold text-decoration-underline">
              Phone
            </span>{" "}
            : {user.phone}{" "}
          </li>
        </ul>
      </div>
    </>
  );
};

export default user;
