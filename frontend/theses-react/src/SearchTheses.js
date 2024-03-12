import {  useState, useEffect } from "react";
import InputField from "./InputField";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ThesisData= () => {
    const [getThesis, setGetThesis ] = useState(null);
    const [loading ,setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [userData, setUserData] =useState(null);
    const [error, setError] = useState(false);
    const [isLoggedOut ,  setIsLoggedOut]= useState(false);
    const history = useHistory();

    ( () => {
      const getuserDetails = localStorage.getItem("userData");
      if ( !getuserDetails) {
        history.push('/');
      }else {
          history.push('/get-thesis-data');
      }
   })();
   
    useEffect(() => {
      
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
          const {user} = JSON.parse(storedUserData);
          setUserData(user);
          console.log(user.id);
          console.log(userData);
         }
  },[]);
  // console.log(userData);
   const handleGo = async() => {
      
      setLoading(true);
      fetch('http://localhost:4000/get-thesis-data',{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keyword: query }, ), 
      })
      .then((response) => {
         if(!response.ok){
            throw new Error("Error occured while fetch data !!")
         }else {
            return response.json();
         }
      })
      .then((data) => {
       console.log(data.data);
       setGetThesis(data.data);

       setLoading(false);
      })
      .catch(error => {
         console.error("Error Getting thesis from server :", error);
         setError(error.message);
         setLoading(false);
      })
       
   }

   const handleClick = (  title, titleLink) => {
   
      const clickData = {
         userId : userData.id ,
         title:title ,
         titleLink :titleLink,
         clickedtAt: new Date().toLocaleString()
      };
      console.log(clickData);
      fetch("http://localhost:4000/get-thesis-data/clicked-history", {
         method:"POST",
         headers:{
            'Content-Type': 'application/json',
          },
         body:JSON.stringify(clickData),
      })
      .then((response) => {
         if(!response.ok){
            throw new Error("Error occured while sending the click details")
         }else {
            return response.json();
         }
      })
      .catch(error => {
         console.error("Error sending the click details :", error);
         setError(error.message);
         setLoading(false);
      })
   };

   const handleLogout = () => {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      setIsLoggedOut(true);
      history.push('/');
    };
     return ( 
      <div className="container">
            <div className = "flex-box">
            <h2 className="first-box welcome-user">
                Welcome {userData ? userData.name : "User"}   &#x1F338;; !
            </h2>
            <div className="first-box btn-history">
                <Link to="/get-thesis-data/clicked-history">
                    <button>Visted Theses</button>
                </Link>
             </div>
             <div className="first-box btn-logout">
                <button onClick={handleLogout}>Logout</button>
             </div>
            </div>
           
            <div className="search-content">
               <div className="flex-title">
                <h3 className="search-title">Take A Dive Deep Into Theses</h3>
               </div>
                <div className="flex-search-bar">
                 <div className="second-box input-field">
                    <InputField
                        type="text"
                        placeholder="Search here"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }} />
                 </div>
                 <div className="second-box input-button">
                    <button onClick={handleGo}>Go</button>
                 </div>
                 <div className="second-box click-title">
                    <div>Unlock thesis PDFs with a click!</div>
                 </div>
                </div>
                {query !== "" && (
                    <div className="searched-panel">
                        {loading && <h1>Loading...</h1>}
                        {error && <h1>Error Occurred: {error}</h1>}
                        {!loading && !error && getThesis && (
                            <table border={1}>
                                <thead>
                                    <tr>
                                        <th>Upload Date</th>
                                        <th>Title</th>
                                        <th>Researcher</th>
                                        <th>Guide</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getThesis.map((thesis) => (
                                        <tr key={thesis.id}>
                                            <td>{thesis.uploadDate}</td>
                                            <td><a target="_blank" href={thesis.hyperLink} onClick={() => handleClick(thesis.title, thesis.hyperLink)}>{thesis.title}</a></td>
                                            <td>{thesis.researcher}</td>
                                            {<td>{thesis.guide}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default ThesisData;

// onClick={() => handleClick(thesis.title, thesis.hyperLink)}