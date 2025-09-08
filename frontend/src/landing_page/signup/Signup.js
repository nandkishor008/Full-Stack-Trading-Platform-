import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", background: "#f8fafc" }}
    >
      <div
        className="card shadow"
        style={{
          width: 380,
          border: "none",
          borderRadius: 16,
          padding: 32,
          background: "#fff",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ color: "#387ed1", fontWeight: 700 }}
        >
          Create your Zerodha account
        </h2>

        {/* FIXED: Changed from HTTP to HTTPS */}
        <form
          action="https://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com/signup"
          method="POST"
        >
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="form-control"
              style={{ borderRadius: 8 }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="form-control"
              style={{ borderRadius: 8 }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="form-control"
              style={{ borderRadius: 8 }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              borderRadius: 8,
              background: "#387ed1",
              border: "none",
              fontWeight: 600,
            }}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: 14 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;