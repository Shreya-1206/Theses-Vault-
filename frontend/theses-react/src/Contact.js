import { useState } from "react";
import InputField from "./InputField";
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let contactDetails = {name, email, subject, message};
        console.log(contactDetails);

        fetch('http://localhost:4000/contact' ,{
                    method:"POST",
                    headers:{'Content-Type':"application/json"},
                    body:JSON.stringify(contactDetails)
                 })
                 .then((response) => {
                    if(!response.ok) {
                      throw new  Error("Sorry the message was not sent  " + response.status);
                    } else {
                     return response.json();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  })
    }

    return (  
      <div className="main-contact">

        <form action="post">
          <div className="contact-form">
            <div className="contact-title">Contact Us</div>
            <div className="contact-body">
              <div className="contact-field">
               <label>Name</label>
                 <InputField
                  type="name" 
                  value = {name}
                  name ="name" 
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={(e) => {e.target.reportValidity()}}
                  />
              </div>
              <div className="contact-field">
               <label>Email</label>
                  <InputField 
                  type ="text"
                  name ="email"
                  value = {email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) => {e.target.reportValidity()}}
                  /> 
              </div>
              <div className="contact-field">
              <label htmlFor = "subject">Subject </label>
                  <InputField 
                   type="text" 
                   value ={subject} 
                   name ={subject} 
                   placeholder="subject"
                   required
                   onChange ={(e) => setSubject(e.target.value)}
                   onKeyUp={(e) => {e.target.reportValidity()}}
                   /> 
              </div>
              <div className="contact-field">
               <label>Message</label>
                  <textarea
                  type="message" 
                  value={message}
                  name ="message" 
                  placeholder="Your message"
                  required
                  onChange = {(e)=>setMessage(e.target.value)}
                  onKeyUp={(e) => {e.target.reportValidity()}}
                  rows="6"/>  
              </div>
              <div className="contact-field">
               <button onClick={handleSubmit}>Send Message</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}
 
export default Contact;

