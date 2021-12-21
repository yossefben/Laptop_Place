const Input = ({ required, name, label, error, ...rest }) => {
  return (
    <div>
      <div className="form-group mb-3">
        <label htmlFor={name} className="fw-bold">
          {required && <span className="text-warning me-2">*</span>}
          {label}
        </label>
        <input {...rest} name={name} id={name} className="form-control" />

        {error && <span className="text-warning fst-italic">{error}</span>}
      </div>
    </div>
  );
};

export default Input;
