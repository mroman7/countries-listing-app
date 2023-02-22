import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/home';
import CountryDetail from './pages/countryDetail';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<CountryDetail />} />        
      </Routes>
    </>
  );
}

export default App;
