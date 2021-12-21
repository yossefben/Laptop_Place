const Card = ({
  card: { bizImage, bizName, bizAddress, bizPhone, bizDescription },
  onDelete,
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
          <h5 className="card-title text-dark fw-bold">{bizName}</h5>
          <div className="card-text text-dark">{bizDescription}</div>
          <div className="card-text border-top pt-3 mt-4">
            <a target="_blank" rel="noreferrer" href={"tel:" + bizPhone}>
              <i className="bi bi-telephone-fill me-2"></i>
              {bizPhone}
            </a>
          </div>
          <div className="card-text border-top pt-3">
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
          </div>

          <div className="d-grid justify-content-md-end">
            <button
              className="me-md-2 btn btn-danger fw-bold"
              onClick={onDelete}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
