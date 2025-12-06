import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css";

function App() {
  const loading = useSelector(state => state.auth && state.auth.loading);
  return (
    <BrowserRouter>
      <div className="app-layout">
        {loading && (
          <div className="loader-overlay" aria-hidden>
            <div className="loader" />
          </div>
        )}
        <Navbar />
        <main className="main-area">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/users"
              element={<ProtectedRoute><Users /></ProtectedRoute>}
            />
            <Route
              path="/projects"
              element={<ProtectedRoute><Projects /></ProtectedRoute>}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
