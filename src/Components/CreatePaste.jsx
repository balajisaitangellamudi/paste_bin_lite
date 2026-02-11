import { useEffect, useState } from "react";
import useFetchApi from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CreatePaste = () => {
  const { fetchApi, cancelAll } = useFetchApi();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    content: "",
    ttlSeconds: "",
    maxViews: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // pastes list
  const [myPastes, setMyPastes] = useState([]);

  // loading pastes from lcoal storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pastes")) || [];
    setMyPastes(stored);

    return () => cancelAll();
  }, []);

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submitting of paste
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setData(null);

    const { content, ttlSeconds, maxViews } = formState;

    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    const payload = {
      content: content.trim(),
    };

    if (ttlSeconds && Number(ttlSeconds) >= 1) {
      payload.ttl_seconds = Number(ttlSeconds);
    }

    if (maxViews && Number(maxViews) >= 1) {
      payload.max_views = Number(maxViews);
    }

    setLoading(true);

    try {
      const result = await fetchApi("api/pastes", "POST", payload);

      if (result?.id && result?.url) {
        setData(result);

        const existing = JSON.parse(localStorage.getItem("pastes")) || [];

        // prevent duplicates
        const updated = existing.some((p) => p.id === result.id)
          ? existing
          : [...existing, { id: result.id }];

        localStorage.setItem("pastes", JSON.stringify(updated));
        setMyPastes(updated);
      } else {
        setError(result?.message || "Failed to create paste");
      }
    } finally {
      setLoading(false);
    }
  };

  // resetting form
  const handleReset = () => {
    setFormState({
      content: "",
      ttlSeconds: "",
      maxViews: "",
    });
    setError(null);
    setData(null);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card shadow d-flex flex-row">
            {/* MAIN CONTENT */}
            <div className="card-body col-12 col-xl-9">
              <h3 className="mb-3">Create New Paste</h3>

              {/* error */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError(null)}
                  />
                </div>
              )}

              {/* success*/}
              {data && (
                <div className="alert alert-success">
                  <h5>Paste created successfully!</h5>
                  <p className="mb-1">Share this URL:</p>

                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={data.url}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        navigator.clipboard.writeText(data.url);
                        alert("Copied!");
                      }}
                    >
                      Copy
                    </button>
                  </div>

                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleReset}
                  >
                    Create Another Paste
                  </button>
                </div>
              )}

              {/* FORM */}
              {!data && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      Paste Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control font-monospace"
                      rows="10"
                      name="content"
                      value={formState.content}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-text">
                      Characters: {formState.content.length}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Expire After (seconds)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="ttlSeconds"
                        value={formState.ttlSeconds}
                        onChange={handleChange}
                        min="1"
                        placeholder="Optional"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Maximum Views</label>
                      <input
                        type="number"
                        className="form-control"
                        name="maxViews"
                        value={formState.maxViews}
                        onChange={handleChange}
                        min="1"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? "Creating Paste..." : "Create Paste"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* side bar pastes list */}
            <div className="d-none d-xl-block col-xl-3 border-start p-3">
              <p className="fw-bold mb-2">My Pastes</p>

              {myPastes.length === 0 && (
                <p className="text-muted small">No pastes yet</p>
              )}

              <ul className="list-unstyled">
                {myPastes.map((paste) => (
                  <li
                    key={paste.id}
                    className="mb-2 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`p/${paste.id}`)}
                  >
                    {paste.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePaste;
