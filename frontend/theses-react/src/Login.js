import { useState } from "react";

import { useHistory} from "react-router-dom";


const Login = () => {
    // const [userName, setUserName] =useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginDetails = {email, password};
        // console.log(loginDetails);
        if(loginDetails.email === "" || loginDetails.password === ""){
            setErrorMessage("All fields are required.");
        } else {
          fetch('https://theses-vault-3.onrender.com/login', {
            method : "POST",
            headers : { 
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(loginDetails)
            
          })
          .then((response) => {
            if(!response.ok) {
              throw new  Error("Retriving Data Error: " + response);
            } else {
             return response.json();
            }
          })
          .then((data) => {
            // console.log(data.data);
            localStorage.setItem("userData", JSON.stringify(data.data));
           history.push('/get-thesis-data');
            setErrorMessage(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            setErrorMessage("An error occurred while logging in.");
            history.push("/login");
        });
        }
       
    }
   

    return ( 
      
        <div className="main-login">
          <div className="flex-login">
          <form action="" onSubmit={handleSubmit}>
            <div className="login-form">
              <div className="login-title">Login</div>
              <div className="login-body">
                <div className="login-field">
                  <label>Email  </label>
                  <input 
                  type ="email"
                  required
                  value ={email}
                  placeholder="Enter your email"
                  onChange = {(e) => {setEmail(e.target.value)}}
                  onKeyUp={(e) => {e.target.reportValidity()}}
                 ></input>
                </div>
                <div className="login-field">
                 <label>Password </label>
                 <input 
                 type="password"
                 required
                 value ={password}
                 placeholder="Enter your password"
                 onKeyUp={(e) => {e.target.reportValidity()}}
                 onChange = {(e) => {setPassword(e.target.value)}}
                 ></input> 
                </div>
                <div className="login-field">
                 <button type="submit">Submit</button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              </div>
            </div>
          </form>
          </div>
          <div className="register-flex">
            <button onClick ={() => history.push('/register')}>Register Here</button>
          </div>
        </div>
     );
    }

 
export default Login;

