import React, { useState } from "react";
import './App.css'
import { BrowserRouter, Route, Routes,Link } from "react-router-dom"
import Priority from "./Priority";
import RoundRobin from "./RoundRobin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/roundrobin" element={<RoundRobin />} />
        <Route path="/priority" element={<Priority />} />
      </Routes>
    </BrowserRouter>
  );
}


let Main = () => {
  return (
    <div className="App">
      <h1>CPU SCHEDULING ALGORITHMS</h1>
      <div className="buttons_calc">
        <Link to="/roundrobin"><button>Round Robin</button></Link>
        <Link to="/priority"><button>Priority</button></Link>
      </div>
    </div>
  )
}
export default App