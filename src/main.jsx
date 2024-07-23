import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'
import Home from './home.jsx';
import Nineline from './nineline.jsx'
import Sitrep from './sitrep.jsx'
// import UXO from './uxoreport.jsx'
import Location from './location.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")}



  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/nineline" element={<Nineline/>} />
            <Route path="/sitrep" element={<Sitrep/>} />    
            {/* <Route path="/uxoreport" element={<UXO/> }/>    */}
            <Route path="/location" element={<Location/> }/>      
          </Routes>
            
         
        </Router>
      </ClerkProvider>
    </React.StrictMode>
  )