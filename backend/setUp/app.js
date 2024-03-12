import express from "express";
import connectToDb from "./db/index.js";
import UserHistory from "./model/userHistory.js";
import fetchThesisData from "./storethesis.js";
import compression from "compression";
import {loginUser, registerUser, ContactInfo} from "./controllers/registerLoginUser.js";



const app = express();


app.use(compression());
app.use(express.json()); 
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get("/", (req, res) =>{
    res.status(200).send("<h1>Home Page of Our App</h1>");
});

app.post('/register', async(req,res) =>{
    //console.log(req.body);
    try{
        const {name, email, password} = req.body;
        if (req.body) {
            
            await registerUser({name,email,password});
            
            res.status(200).json({
                status :200,
                
                message : "Recived Register Details Successfully !!"
            });
           
            
        }else {
            res.status(403).json({
                status : 400,
                message : 'Sorry Register details  are missing !!'
            })
        }
    }catch(error) {
      console.log(error);
    }
});

app.post("/login", async(req, res) =>{
  try {
   if(req.body) {
       const {email, password} = req.body;
   //    console.log("Email : ", email);
   //    console.log("Password :", password);
       
      const {user,token } = await loginUser({email, password});
     
       res.status(200).json({
           status : 200,
           data : {user, token},
           message: "Logged in Successfully!"
       });
      } else {
       res.status(401).json({ //homework
           status : 401,
           message : "Sorry the userId  and password you entered is incorrect"
       });
      }
  }catch(error) {
    console.log(error);
  }
}); 

app.post("/get-thesis-data", async (req, res) => {
    try {
        const keyword = req.body.keyword;
        // console.log(keyword);
        

    //    const searchUrl = `https://shodhganga.inflibnet.ac.in/browse?type=title&sort_by=1&order=ASC&rpp=20&etal=-1&starts_with=${encodeURIComponent(keyword)}`;
        const fetchTheses = await fetchThesisData(keyword);

      if(!fetchTheses){
        return res.status(404).json({
            status : 404,
            message : 'No Thesis Data Found'
        })
      } else {
        return res.status(200).json({
            status : 200,
            data : fetchTheses,
            message : "data recived"
        })
      }
    }catch(error) {
      console.log(error);
      return res.status(503).json({
        status : 503,
        message : "server side error !!"
      })
    }
});

app.post("/get-thesis-data/clicked-history", async(req, res) => {
  try {
   const {userId, title, titleLink, clickedAt} = req.body;
  //  console.log(titleLink);
  //  console.log(clickedAt);
  //  console.log(title);
  //  console.log(userId);
  

   const userHistory = new UserHistory({
    userId: userId,
    title : title,
    titleLink: titleLink,
    clickedtAt :clickedAt
   })
   
   await  userHistory.save();

   res.status(200).json({
    status: 200,
    data : userHistory,
    message : "Successfully noted the click events "
   })
   
  }catch(err) {
    res.status(400).json({
      status : 400,
      message : "Couldn't note the click events "
    })
    console.log("error : " +err)
  }
});

app.get("/get-thesis-data/clicked-history", async(req, res )=> {
  try{
     const userId= req.query.userId;
     console.log("Requested userId:", userId);
     const getHistoryDetails = await  UserHistory.find({userId});
     console.log(getHistoryDetails);
     if(!getHistoryDetails){
      return res.status(404).json({
        status : 404 ,
        message:"No history found"
      })
     }else{
      return res.status(200).json({
        status :200,
        data :  getHistoryDetails,
        message : "Sucessesfully sent data of history !!!"
      })
     }
       res.status(200).send(getHistoryDetails);
  }catch(error) {
    console.log(error);
  }
});

app.delete('/get-thesis-data/clicked-history/:id', async (req, res) => {
  try {
      const historyId = req.params.id;
      console.log(historyId);
    
      const deletedHistory = await UserHistory.findByIdAndDelete(historyId);
      if (!deletedHistory) {
          return res.status(404).json({
         
     status: 404,
              message: 'History entry not found',
          });
      }
      res.status(200).json({
          status: 200,
          message: 'History entry deleted successfully',
      });
  } catch (error) {
      console.error('Error deleting history entry:', error);
      res.status(500).json({
          status: 500,
          message: 'Internal server error',
      });
  }
});
app.post('/contact', async(req, res) => {
  try {
   const {name, email, subject, message} = req.body;

   if(req.body) {
    const contactInfo = await ContactInfo({name, email, subject, message});
    //console.log(contactInfo);
    return res.status(200).json({
        status : 200,
        message : 'Your Message has been sent successfully'
    });
   }else {
    return res.status(400).json({
        status : 400,
        message : 'Your Message has not been send Please retry !!'
    })
   }
  }catch(error) {
     console.log(error)
  }

    
});

Promise.all([connectToDb()])
  .then(() => app.listen(4000, () => (
    "Server is runing on port 4000")))
  .catch(error => {
    console.error(`Mongo Atlas Error : ` +error)
    process.exit();
  })  
