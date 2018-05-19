import express  from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import crypto from 'crypto';
import User from '../../models/User';

mongoose.connect('mongodb://ebdbuser:ebdbpassword@ds229380.mlab.com:29380/egitimbudur_db' );
mongoose.Promise = global.Promise;


const users = [
    {_id:'user23' , firstName : 'bekir' , lastName: 'bedir' , email: 'bekir@gmail.com' , password: '123456'}
]

const route = () => {
    const router = new express.Router();

    router.route('/login').post((req,res) => {
        const {email , password} = req.body;    

        const user = users.find( (user) => user.email === email )
        if(!user){
            res.send({
                status : false,
                message : 'Email adresi bulunamadi!'
            })
        }
        else{
            if(user.password === password)
            {
                //create Token
                const token  = jwt.sign( {userId: user._id} , config.jwtSecret )


                res.send({
                    status:true,
                    token: token
                })
            }
            else{
                res.send({
                    status:false,
                    message: 'Şifre hatali!'
                })
            }
        }

    });


    router.route('/sign-up').post( ( req, res ) => {

        const {email , password } = req.body
        const passwordHashed = crypto.createHmac('sha256' , config.passSecret )
                                                .update(password)
                                                .digest('hex');

        const newUser = new User({
            email: email,
            password: passwordHashed,
            dateCreated: new Date(),
            dateModified: new Date()
        });

        newUser.save().then( 
            (data) => {
                res.send({status:true , user: data})
            },
            (err) => {
                res.send({status: false , error: err})
            }
     )


    })

    return router;
}


export default {
    route,
    routePrefix : `/${config.version}/auth`
}