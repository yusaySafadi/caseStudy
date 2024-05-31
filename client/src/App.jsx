import { useState } from 'react'
import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";

function App() {

  return (
    <div className="app-container">
      <Header/>
    <Sidebar/>
    </div>
  )
}

export default App
