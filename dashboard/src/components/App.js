import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GeneralContextProvider } from "./GeneralContext";
import Home from "./Home";

function App() {
  return (
    <GeneralContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GeneralContextProvider>
  );
}

export default App;
