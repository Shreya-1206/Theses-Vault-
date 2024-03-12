import { Schema, model } from "mongoose";

const contactInfo = new Schema({
    name : {
        type : String,
        require : true
    },
    email: {
        type: String,
        unique: true ,
        require : true
    },

    subject : {
        type: String,
        require : true
    },

    message : {
        type : String,
        require : true
    }
});

const ContactInformation = model("ContactInformation", contactInfo);

export default ContactInformation;