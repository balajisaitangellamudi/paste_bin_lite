import React from "react";
import "../Assets/ErrorComponents.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to console
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow border-danger">
                <div className="card-header bg-danger text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-bug-fill me-2"></i>
                    Application Error
                  </h4>
                </div>
                <div className="card-body">
                  <p className="lead">
                    Something went wrong in the application.
                  </p>
                  <p>
                    We apologize for the inconvenience. Please try one of the
                    following:
                  </p>

                  <div className="d-grid gap-2 mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleReset}
                    >
                      <i className="bi bi-house"></i> Go to Home Page
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => window.location.reload()}
                    >
                      <i className="bi bi-arrow-clockwise"></i> Reload This Page
                    </button>
                  </div>

                  <details className="mt-3">
                    <summary className="cursor-pointer text-muted">
                      <small>
                        <i className="bi bi-code-slash"></i> Technical Details
                        (for developers)
                      </small>
                    </summary>
                    <div className="mt-2 p-3 bg-light rounded">
                      <h6>Error:</h6>
                      <pre className="text-danger small mb-2">
                        {this.state.error?.toString()}
                      </pre>
                      {this.state.errorInfo && (
                        <>
                          <h6 className="mt-3">Stack Trace:</h6>
                          <pre
                            className="small"
                            style={{ maxHeight: "200px", overflow: "auto" }}
                          >
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
