import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import { Routes,Route } from "react-router-dom";
import Aboutus from "./Components/Aboutus";
import Error from "./Components/Error";
import Userhomepage from "../src/Components/Userhomepage";
import CppExamForm from "./Components/CppExamForm";
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
   <Route path='/' element={<Userhomepage/>} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Login' element={<Login/>} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/about' element={<Aboutus/>} />
        <Route path='/test/' element={<CppExamForm/>} />

        <Route path='/*'element={<Error/>} />
      </Routes>
      
    </>
  );
}

export default App;