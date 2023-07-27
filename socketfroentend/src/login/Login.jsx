import React, { useState } from 'react';
import axios from 'axios';
import { Link,} from 'react-router-dom';
import './snackbar.css'
import { login_url } from '../contants/const';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(login_url, {
        username,
        password
      });
      const token = response.data.token;
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); // Expiration date set in seconds
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      myFunction();
    }
  };

  function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
    } else {
     setPasswordType("password")
    }
  }

  return (
<div className="d-flex justify-content-center align-items-center vh-100">
  <div className='px-4 py-4 rounded min-w-300px' style={{border:`2px #393646 solid`}}>
    <h2 className='text-center fw-bold mb-4'>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          className="form-control shadow-none"
          onChange={(e) => setUsername(e.target.value)}
          style={{border:`2px #393646 solid`}}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type={passwordType}
          id="password"
          name="password"
          value={password}
          className="form-control shadow-none"
          onChange={(e) => setPassword(e.target.value)}
          style={{border:`2px #393646 solid`}}
        />
      </div>

      <span className='showpassdiv'>
          <i class={passwordType == "password" ? "fa-solid fa-eye-slash showpass" : "fa-solid fa-eye showpass" } onClick={togglePassword}></i>
        </span>

      <div className='d-flex justify-content-evenly'>
      <button type="submit" className="btn mt-2 log-btn" style={{width: `40%`, border:`2px #393646 solid`}}>Login</button>
      <Link to="/register" className="btn mt-2 log-btn" style={{width: `40%`, border:`2px #393646 solid`}}>Register</Link>
      </div>
    </form>
  </div>
  <span id="snackbar">Invalid credentials. Please try again.</span>
</div>


  );
};

export default Login;
