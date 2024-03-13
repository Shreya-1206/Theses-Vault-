import mongoose from "mongoose";

// const connectToDb = () => mongoose.connect(`mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@atlascluster.8t8ov5q.mongodb.net/?retryWrites=true&w=majority`, 
const connectToDb = () => mongoose.connect(`mongodb+srv://*:*@atlascluster.8t8ov5q.mongodb.net/?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
//     useCreateIndex : true,
//     useFindAndModify : false
//  
 }
);

export default connectToDb;
