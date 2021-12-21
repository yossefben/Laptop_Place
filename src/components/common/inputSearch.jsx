const InputSearch = ({ ...rest }) => {
  return (
    <div className="input-group input-group-lg mt-3 ">
      <span className="input-group-text" id="inputGroup-sizing-lg">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="searchBar border border-primary border-3"
        id="searchBar"
        placeholder="Name or Description"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
      />
    </div>
  );
};

export default InputSearch;
