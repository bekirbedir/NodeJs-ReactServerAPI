import express  from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../models/User';






const route = () => {
    const router = new express.Router();

    router.route('/login').post((req,res) => {
        const {email , password} = req.body;    
   
        
        const user = User.findOne({email: email}).then((user)=>{
            console.log('user: ' + user)
            if(!user){
                res.send({
                    status : false,
                    message : 'Email adresi bulunamadi!'
                })
            }
            else{
                if(user.password === crypto.createHmac('sha256', config.passSecret).update(password).digest('hex'))
                {
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
        })
       

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