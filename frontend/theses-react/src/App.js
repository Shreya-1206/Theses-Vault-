import {BrowserRouter as Router , Route , Switch, Redirect} from "react-router-dom";

// import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import History from "./History.js"
import Contact from "./Contact.js";
import ThesisData from "./SearchTheses.js";



function App() {
  return (
    <Router>
      <div className="App">
     {/* <NavBar /> */}
      <div className="content">
       <Switch>
         <Route  exact path ="/">
          <Home/>
         </Route>
          <Route exact path ="/get-thesis-data" >
            <ThesisData />
           </Route>
         <Route  exact path ="/get-thesis-data/:clicked-history">
          <History />
         </Route>
         <Route  exact path ="/contact">
          <Contact />
         </Route>
         <Route exact path="/login" >
           <Login/>
         </Route>
         <Route exact path="/register"> 
          <Register/>
        </Route>
       </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
