import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', background: '#f8fafc' }}>
      <div className="card shadow" style={{ width: 380, borderRadius: 16, padding: 32 }}>
        <h2 className="mb-4 text-center" style={{ color: '#387ed1', fontWeight: 700 }}>Login to Zerodha</h2>
        
        <form action="http://zerodha-clone-env.eba-umbwwcgx.eu-north-1.elasticbeanstalk.com/login" method="POST">
          
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input
              type="email"
              name="email" 
              required
              className="form-control"
              style={{ borderRadius: 8 }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
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
            style={{ borderRadius: 8, background: '#387ed1', border: 'none', fontWeight: 600 }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: 14 }}>
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;