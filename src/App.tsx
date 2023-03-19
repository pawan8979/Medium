import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { Login } from "./pages/Login";
import { Error } from "./pages/error"
import { Navbar } from "./components/Navbar";
import { CreatePost } from "./pages/create-post/Create-Post";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
