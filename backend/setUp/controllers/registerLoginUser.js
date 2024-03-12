import ContactInformation from '../model/contactInformation.js';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import UserHistory from '../model/userHistory.js';

const sign = (obj) => 
 new Promise((resolve, reject) => {
  jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
    if(error) {
        return Promise.reject()
    } else {
       return resolve(token)
    }
  })
 })



export const ContactInfo = async({name, email, subject, message}) => {
    try {
     const contactDetails = await ContactInformation.create({ name, email, subject, message });

     return Promise.resolve();
    }catch(err){
    return Promise.reject({err});
    }
}
export const registerUser = async({name, email, password}) => {
    try {
       const user=  await  User.create({ name, email, password });
       const token = await sign({
        id : user._id,
        name : user.name,
        email : user.email
        })
        return Promise.resolve({ //resolved with an obj user property which is sent to client react app
            user : {
                id : user._id,
                name : user.name,
                lastLoggedIn : user.lastLoggedIn
            }, token
        });
    } catch (error) {
        return Promise.reject({error});
  } 
}


export const loginUser = async({email, password}) => {
    try {
        // console.log(email);
        // console.log(password);
        const user = await User.findOne({ email});
        if (!user) {
            throw new Error("User not found");
        }

        await user.checkPassword(password);
        await user.updateLoggedIn();
        const token = await sign({
            id : user._id,
            name : user.name,
            email : user.email
        });
        return Promise.resolve({
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                lastLoggedIn : user.lastLoggedIn
            }, token
        });
    } catch(error){
        return Promise.reject(error);

    }
}

