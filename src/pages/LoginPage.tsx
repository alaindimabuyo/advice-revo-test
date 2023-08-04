import {useState} from 'react'
import loginImage from '../assets/images/office-background.jpg'
import {  Link } from "react-router-dom";
import {useLoginUserMutation} from '../redux/auth/api'
import localforage from 'localforage';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginUser, result] = useLoginUserMutation();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!email.trim() || !password.trim()) {
      setErrorText('Email and password are required.');
    } else {
     
      const body = { username: email, password }
      const { data } = await loginUser(body);
      
      const token = await localforage.setItem('authToken', data.accessToken);

      localforage.setItem('authToken', token).then(() => {
        console.log("success")
        navigate("/dashboard");
      });
    
    }
  };

  
  return  (
    <form onSubmit={handleSubmit} method="post" action="">
      <div className="login-container">
        <section  className="form-container">
          <div>
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p className="gray-text">The faster you fill up, the better</p>
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input
                required
                autoComplete="off"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input
                required
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
