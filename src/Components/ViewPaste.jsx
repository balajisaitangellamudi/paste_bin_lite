import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetchApi from "../Hooks/useFetch";

const ViewPaste = () => {
  const { id } = useParams();
  const { fetchApi, cancelAll } = useFetchApi();

  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaste();

    return () => {
      cancelAll();
    };
  }, [id]);

  const fetchPaste = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await fetchApi(`api/pastes/${id}`);

      if (result?.status === 200 && result?.content) {
        setPaste(result);
        return;
      }

      if (result?.status === 404) {
        setError(result?.message || "Paste not found or has expired");
        return;
      }

      setError(result?.message || "Failed to fetch paste");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(paste.content);
    alert("Content copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3 text-muted">Loading paste...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            The paste may have expired, reached its view limit, or does not
            exist.
          </p>

          <Link to="/" className="btn btn-sm btn-outline-danger mt-3">
            Create New Paste
          </Link>
        </div>
      </div>
    );
  }

  if (!paste) return null;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <h5 className="mb-0">Paste View</h5>
              <Link to="/" className="btn btn-sm btn-light">
                New Paste
              </Link>
            </div>

            <div className="card-body">
              {/* META */}
              <div className="mb-3 d-flex gap-2 flex-wrap">
                {paste.remaining_views !== null && (
                  <span className="badge bg-info">
                    {paste.remaining_views} views remaining
                  </span>
                )}

                {paste.expires_at && (
                  <span className="badge bg-warning text-dark">
                    Expires: {new Date(paste.expires_at).toLocaleString()}
                  </span>
                )}

                {paste.remaining_views === null && !paste.expires_at && (
                  <span className="badge bg-success">No restrictions</span>
                )}
              </div>

              {/* CONTENT */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Content</strong>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={copyContent}
                  >
                    Copy
                  </button>
                </div>

                <pre
                  className="bg-light p-3 rounded border"
                  style={{ maxHeight: 500, overflow: "auto" }}
                >
                  <code>{paste.content}</code>
                </pre>
              </div>

              <div className="text-muted small">Paste loaded successfully</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
