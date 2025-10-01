import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GeneralContextProvider } from './GeneralContext'; // Make sure path is correct
import Home from './Home'; // Your existing Home component

function App() {
  return (
    // ✅ FIX: The provider now wraps your ENTIRE application.
    <GeneralContextProvider>
      <BrowserRouter>
        <Routes>
          {/* All routes will now render the Home component, which contains the layout */}
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GeneralContextProvider>
  );
}

export default App;