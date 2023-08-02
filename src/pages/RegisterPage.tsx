import registerImage from '../assets/images/walls-background.jpg'
import {  Link } from "react-router-dom";
const RegisterPage = () => {
  return  (
    <form method="post" action="">
      <div className="login-container">
        <section  className="form-container">
          <div>
            <div className="login-header">
              <h1>Join for Success</h1>
              <p className="gray-text">Are you ready to take the next step towards a successful future? Look no further and join Advice Revolution!</p>
            </div>

            <div className="form-input">
              <label htmlFor="firstname">First Name</label>
              <input required autoComplete="off" type="firstname" name="firstname" id="firstname" placeholder="Enter your Email"/>
            </div>
            
            <div className="form-input">
              <label htmlFor="lastname">Last Name</label>
              <input required autoComplete="off" type="lastname" name="lastname" id="lastname" placeholder="Enter your Email"/>
            </div>

            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input required autoComplete="off" type="email" name="email" id="email" placeholder="Enter your Email"/>
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input required autoComplete="off" type="password" name="Password" id="Password" placeholder="Enter your Password"/>
            </div>

            <input type="submit" value={"Sign Up"}/>

            <p className="gray-text">Already have an account? <span className="form-sub-text"> <Link to={`/`}>Log In</Link></span></p>
          </div>
        </section>
        <section>
          <img src={registerImage} alt="Girl in a jacket" width="500" height="600" className="login-image"/>
        </section>

      </div>
    </form> 
  )
  
};

export default RegisterPage;
