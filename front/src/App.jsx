import logo from './logo.svg';
import styles from './App.module.css';
import { Button } from "@suid/material"
import { Routes, Route } from "solid-app-router";
import  Addpost  from "./pages/addpost";
import  Login from "./pages/login";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Useraccout from "./pages/useraccout";
import Userpost from "./pages//userpost";




function App() {
  return (
    <Routes>      
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/useracc' element={<Useraccout/>} />
      <Route path='/addpost' element={<Addpost />} />
    </Routes>
    );
}

export default App;
