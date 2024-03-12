import { Schema, model } from "mongoose";

const thesisData=  new Schema({ 
  title : {
    type : String,
    required: true
  },
  uploadDate : {
    type : Date,
    required : true
  },
  
  researcher : {
    type : String,
    required : true
  },

  guide : {
    type  :String,
    required : true
  },
  hyperLink : {
    type : String,
    required : true
  }
});

const Thesis = model("Thesis", thesisData);

export  default Thesis;