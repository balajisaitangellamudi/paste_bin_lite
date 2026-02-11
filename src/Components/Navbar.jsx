import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-clipboard-data"></i> Pastebin-Lite
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
