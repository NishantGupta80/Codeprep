import React,{useState} from 'react'
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    //i have to know this by video
    let navigate=useNavigate();
    const [user,setUser]=useState({
        name: "",email: "",phone:"",work:"",password:"",cpassword:""
      });
      let name,value;
      const handleInputs=(e)=>{
        
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
      }
      

      const postData=async(e)=>{
        e.preventDefault();
        const { name, email, phone, work, password, cpassword }=user;
        const res=await fetch('/signup',{
          method:"POST",
          headers:{
            "content-Type" : "application/json"
          },
          body: JSON.stringify({
            name, email, phone, work, password, cpassword
          })
          
        });
        const data=await res.json();
        if(res.status===420 || res.status===422||  res.status===402 || res.status===500)
        {
            window.alert(`Registration failed\n${data.message}`);
        }else
        {
            window.alert("Registration Successful");
            console.log("Registration Successful!");
            navigate('/Login');
        }

      }
    return (
      <>
      <section className="signup">
      <div className="container mt-5">
         <div className="signup-content">
            <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                    <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input type="text" name="name" id="name" autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input type="email" name="email" id="email" autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">
                    <i className="zmdi zmdi-phone material-icons-name"></i>
                    </label>
                    <input type="number" name="phone" id="phone" autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your MobileNumber"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                    </label>
                    <input type="text" name="work" id="work" autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">
                    <i className="zmdi zmdi-lock material-icons-Password"></i>
                    </label>
                    <input type="password" name="password" id="Password" autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your Password"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="CPassword">
                    <i className="zmdi zmdi-lock material-icons-Password"></i>
                    </label>
                    <input type="password" name="cpassword" id="CPassword" autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder=" Confirm Your Password"></input>
                </div>
                <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit"  onClick={postData} value="Register"/>
                    </div>
                    
                </form>
              </div>
              <div className="Signup-image">
                <figure>
                    <img src="./sign.jpg" alt="signupimage"/>
                </figure>
                <NavLink to="/login" className="signup-image-link">i am Already register</NavLink>
              </div>
            </div>
    </div>
            
            
            </section>
     </>
    )
  }
  
  export default Signup;