import { Link } from "react-router-dom";

const myProduct = ({
  product: {
    _id,
    productName,
    productDescription,
    productPrice,
    productCategory,
    userPhone,
    productImage,
  },
  onDelete,
}) => {
  return (
    <>
      <div className="card mb-3 mt-3 text-dark">
        <div className="row g-0">
          <div className="col-md-4 my-3">
            <img
              src={productImage}
              className="img-fluid rounded-start"
              alt={productImage}
              style={{ height: "300px", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title fw-bold">{productName}</h2>
              <h4>
                <span className="card-text mt-3 text-decoration-underline fst-italic">
                  Info
                </span>{" "}
                : {productDescription}
              </h4>
              <h4 className="card-text mt">
                <span className="card-text mt-3 text-decoration-underline fst-italic">
                  Category
                </span>{" "}
                : {productCategory}
              </h4>
              <h3 className="card-text text-danger mt-3 fw-bold">
                {productPrice} ₪
              </h3>
              <h3 className="card-text fst-italic">
                <a target="_blank" rel="noreferrer" href={"tel:" + userPhone}>
                  <i className="bi bi-telephone-fill me-2"></i>
                  {userPhone}
                </a>
              </h3>

              <div className="d-grid gap-2 mt-3 d-md-flex justify-content-md-end">
                <div
                  className="btn btn-primary text-light fw-bold"
                  style={{
                    height: "38px",
                    width: "100px",
                  }}
                >
                  <Link
                    to={`/products/myProducts/edit/${_id}`}
                    className="text-light"
                  >
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
      </div>
    </>
  );
};

export default myProduct;
