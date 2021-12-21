const Card = ({
  card: { bizImage, bizName, bizAddress, bizPhone, bizDescription },
  addFav,
}) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img
          src={bizImage}
          alt={bizImage}
          className="p-2 border border-dark border-4"
          style={{ height: "150px", width: "100%" }}
        />
        <div className="card-body">
          <h4 className="card-title text-dark fw-bold">{bizName}</h4>
          <h6 className="card-text text-dark">{bizDescription}</h6>
          <h5 className="card-text border-top pt-3 mt-4">
            <a target="_blank" rel="noreferrer" href={"tel:" + bizPhone}>
              <i className="bi bi-telephone-fill me-2"></i>
              {bizPhone}
            </a>
          </h5>
          <h6 className="card-text border-top pt-3">
            <a
              rel="noreferrer"
              target="_blank"
              href={
                "https://www.google.com/maps/search/?api=1&query=" + bizAddress
              }
            >
              <i className="bi bi-geo-alt-fill me-2"></i>
              {bizAddress}
            </a>
          </h6>

          <div className="d-grid justify-content-md-end">
            <button
              className="me-md-2 btn btn-warning fw-bold"
              onClick={addFav}
            >
              <i className="bi bi-star-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
