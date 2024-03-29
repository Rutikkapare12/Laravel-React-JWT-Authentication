import { Link } from "react-router-dom";

const IndexPage = () => {
    const imagePath = "/images/bg-image.webp";
  return (
    <section
      className="vh-100 vw-100 bg-image"
      style={{ backgroundImage: `url('${imagePath}')` }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container">
          <div className="header">
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/register" className="link">
              Register
            </Link>
          </div>

          <h1 className="main-title">Welcome To Home Page</h1>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
