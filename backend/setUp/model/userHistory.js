import { Schema, model } from "mongoose";


const {ObjectId} = Schema.Types;
const userHistory = new Schema({
    userId : {
      type : String, 
      ref: 'User', 
      required: true 
    },

    title:{
        type : String,
        required: true
    },
    
    titleLink : {
        type: String,
        required: true
    },

    clickedAt : {
        type: Date,
        default: Date.now() 
    }
});

const UserHistory = model("UserHistory", userHistory);
export default UserHistory;