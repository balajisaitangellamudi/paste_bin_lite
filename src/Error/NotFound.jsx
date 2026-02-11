import { useNavigate } from "react-router-dom";
import "../Assets/ErrorComponents.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow text-center">
            <div className="card-body py-5">
              <div className="mb-4">
                <i
                  className="bi bi-exclamation-triangle"
                  style={{ fontSize: "5rem", color: "#ffc107" }}
                ></i>
              </div>
              <h1 className="display-4 mb-3">404</h1>
              <h2 className="h4 mb-3">Page Not Found</h2>
              <p className="text-muted mb-4">
                Oops! The page you're looking for doesn't exist or has been
                moved.
              </p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/")}
                >
                  <i className="bi bi-house-door"></i> Go Home
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-left"></i> Go Back
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted">
              <i className="bi bi-lightbulb"></i>
              <strong> Tip:</strong> Make sure the URL is correct or try
              creating a new paste
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
