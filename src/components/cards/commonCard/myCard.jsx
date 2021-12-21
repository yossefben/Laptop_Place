import { Link } from "react-router-dom";
const myCard = ({
  card: { _id, bizImage, bizName, bizAddress, bizPhone, bizDescription },
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
          <h4 className="card-title text-dark fw-bold">{bizName}</h4>
          <h6 className="card-text text-dark">{bizDescription}</h6>8
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
          <div className="d-grid gap-2 mt-3 d-md-flex justify-content-md-end">
            <div
              className="btn btn-primary text-light fw-bold"
              style={{
                height: "38px",
                width: "100px",
              }}
            >
              <Link to={`/cards/myCards/edit/${_id}`} className="text-light">
                <i className="bi bi-pencil-fill me-2"></i> Edit
              </Link>
            </div>
            <div>
              <button className="btn btn-danger fw-bold" onClick={onDelete}>
                <i className="bi bi-trash me-2"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default myCard;
