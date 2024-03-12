import {useState} from "react";
import { useHistory } from "react-router-dom";
import InputField from "./InputField";
const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    //const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[!(){}[\]<>?|*_-]).{8,}$/;

    const validateInput = () => {
        const fields = [name, email, password, confirmPassword];
        const trimmedFields = fields.map(field => field.trim());
        const isValid = trimmedFields.every(field => !!field);
       
        if (!isValid) {
            setErrorMessage('Please fill out all fields.');
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return false;
        }

        setErrorMessage('');
        return true;
    };
    

    const handleSignUp = (e) => {
        e.preventDefault();
            if(validateInput()) {
                const registrationDetails = {name, email, password, confirmPassword} ;
                 console.log(registrationDetails);
                 fetch('http://localhost:4000/register' ,{
                    method:"POST",
                    headers:{'Content-Type':"application/json"},
                    
                    body:JSON.stringify(registrationDetails)
                 })
                 .then((response) => {
                    if(!response.ok) {
                      throw new  Error("Retriving Data Error: " + response.status);
                    } else {
                     return response.json();
                    }
                  })
                
                  .then((data) => {
                    console.log(data);
                    // Save token in local storage for future use
                //    localStorage.setItem('token', data.dataToken.token);
                   // Redirect to the login page
                   history.push('/login');
                  });
                   setErrorMessage(false);     
            }
    }               

    return ( 
        <div className="main-register">
            <div className="flex-register">
            <form action="" className="child1">
                <div className="register-form">
                    <div className="register-title">Register</div>
                    <div className="register-body">
                        <div className="register-field">
                          <label htmlFor = "name">Full Name </label>
                          <InputField
                           name="name"
                           id = "name"
                           type='text' 
                           required
                           value ={name} 
                           placeholder='Enter your full name' 
                           onChange={(e)=>{setName(e.target.value)}}
                         // onKeyUp={(e) => {e.target.trimLeft()}}
                         />
                        </div>
                        <div className="register-field">
                         <label htmlFor = "email">Email Address  </label>
                         <InputField 
                           name = "email"
                           id = "email"
                            type='email' 
                            required
                            value = {email}
                            placeholder='Enter your email address...'
                            onChange={(e)=>{setEmail(e.target.value)}}
                            onKeyUp={(e) => {e.target.reportValidity()}}
                
                          />
                        </div>
                        <div className="register-field">
                         <label htmlFor ="password">Password</label>
                         <InputField
                           name = "password"
                           id = "passowrd"
                            type='password' 
                            required
                           value = {password} 
                          placeholder='Enter your password...'
                            // onKeyUp={(e) => {}}
                          onChange={(e)=>{setPassword(e.target.value)}}
                          />
                        </div>
                        <div className="register-field">
                        <label htmlFor ="confirm-password"> Confirm Password </label>
                          <InputField
                          name ="conform-password"
                           id = "confirm-password"
                           type='password' 
                           required
                           value ={confirmPassword} 
                           placeholder='Confirm your password'
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           onKeyUp={(e) => e.target.reportValidity()}
                           />
                        </div>
                        <div className="register-field">
                          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                          <button onClick={handleSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="child2">
             <button onClick ={() => history.push('/login')}>login Here</button>
            </div>
          </div>
  
      </div>
  
     );
}
 
export default Register;

