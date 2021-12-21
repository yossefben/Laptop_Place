const Footer = () => {
  return (
    <div className="border-top py-3 text-center bg-dark text-light mt-5">
      <span>
        Laptop <i className="bi bi-laptop"></i> Place
      </span>
      <span className="ms-1">&copy;</span>
      <span className="ms-1">{new Date().getFullYear()}</span>
    </div>
  );
};

export default Footer;
