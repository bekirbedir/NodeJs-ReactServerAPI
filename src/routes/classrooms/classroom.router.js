import express  from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const route = () => {
    const router = new express.Router();

    router.route('/').get( (req , res) => {
        res.send ("All ClassRooms")
    })


    return router;
}


export default {
    route,
    routePrefix : `/${config.version}/classrooms`
}