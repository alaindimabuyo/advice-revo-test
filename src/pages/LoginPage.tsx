import loginImage from '../assets/images/office-background.jpg'
import {  Link } from "react-router-dom";

const LoginPage = () => {
  return  (
    <form method="post" action="">
      <div className="login-container">
        <section  className="form-container">
          <div>
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p className="gray-text">The faster you fill up, the better</p>
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input required autoComplete="off" type="email" name="email" id="email" placeholder="Enter your Email"/>
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input required autoComplete="off" type="password" name="Password" id="Password" placeholder="Enter your Password"/>
            </div>
            <p className="form-sub-text">Forgot Password</p>

            <input type="submit" value={"Sign In"}/>

            <p className="gray-text">Don't have an account? <span className="form-sub-text"> <Link to={`signup`}>Sign Up</Link></span></p>
          </div>
        </section>
        <section>
          <img src={loginImage} alt="Girl in a jacket" width="500" height="600" className="login-image"/>
        </section>

      </div>
    </form> 
  )
  
};

export default LoginPage;
