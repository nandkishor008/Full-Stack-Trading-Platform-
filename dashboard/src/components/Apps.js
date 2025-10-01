import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GeneralContextProvider } from './components/GeneralContext'; 
import Home from './components/Home'; 
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