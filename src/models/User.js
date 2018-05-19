import mongoose from 'mongoose';

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    firstName : String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: [true , "mail adresi girin:)"]
    },
    password: String,
    dateCreated: Date,
    dateModified:Date
})

export default mongoose.model('User' , userSchema)