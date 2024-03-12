import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name : {
        type : String,
        required: true,
    },
    email : { 
        type : String,
        unique : true,
        required : true 
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String,
        defualt : null
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    lastLoggedIn : {
        type : Date,
        default : Date.now()
    } , 

  
});

userSchema.pre("save", async function(next) { //pre Middleware: what is does is before converting schema to model hash the password
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.checkPassword = async function(password) {
    try {
        const match = await bcrypt.compare(password, this.password);
        return match; // Return the result of the comparison directly
    } catch(error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Error comparing passwords"); // Throw an error to indicate failure
    }
}

userSchema.methods.updateLoggedIn = async function () {
   return  this.model("User").findOneAndUpdate(
     {                                      //find the email updates it lastLoggedin
        email : this.email
    },{
        lastLoggedIn : new Date()
    }

   )
}
const User = model("User", userSchema);

export  default User;