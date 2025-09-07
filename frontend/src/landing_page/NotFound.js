import React from "react";

function NotFound() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5 fs-2 mb-3">404 Not Found</h1>
        <p>
            The page you are looking for does not exist. Please check the URL or
            return to the <a href="/">homepage</a>.
        </p>
        
      </div>
    </div>
  );
}

export default NotFound;
