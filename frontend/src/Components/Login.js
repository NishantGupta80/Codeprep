import React from 'react'
import {NavLink} from "react-router-dom";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import frontpic from './frontpic.jpg';
 import {socket} from "C:/IP-1/frontend/src/index.js";



const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  let navigate = useNavigate();

  const loginUser= async (e) =>{
    e.preventDefault();
     const res = await fetch('/signin',{
     method:"POST",
     headers:{
      "Content-Type" : "Application/json"
     },
     body:JSON.stringify({
      email,
      password
     })
     });
   const data= await res.json();
   console.log(data);
   if(res.status===400)
   {
    window.alert(`Invalid Credentials\n ${data.error}`);
   }else{
    window.alert(`LoginSuccesfully\n`);
    socket.emit("updateStatus",(data.email));
    navigate(`/?username=${data.name}&email=${data.email}`);
   }
  }




    return (
    <>
    <section className="signin">
      <div className="container mt-5">
         <div className="signin-content">
         <div className="signin-image">
                <figure>
                    {/* <img src={frontpic} id="signin"/> */}
                </figure>
              
              </div>
            <div className="signin-form">
                <h2 className="form-title">Sign in</h2>
                <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                    <label htmlFor="name">
                    <i class="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input type="email" Email="Email" id="Email" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">
                    <i class="zmdi zmdi-lock material-icons-Password"></i>
                    </label>
                    <input type="password" name="Password" id="Password" autoComplete="off"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your Password"></input>
                </div>
                <div className="form-group form-button">
                    <input type="submit" name="signin" id="signin" onClick={loginUser} className="form-submit" value="Login"/>
                    </div>
                    <NavLink to="/sign-up" className="signup-image-link">Create an Account</NavLink>
                </form>
              </div>
              
            </div>
    </div>
            
            
            </section>
     </>
    )
  }
  
  export default Login;
  