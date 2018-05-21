import AuthRouter from './auth/auth.router';
import ClassroomRouter from './classrooms/classroom.router';
import config from '../config';
import jwtMiddleware from 'express-jwt-middleware';

var jwtCheck = jwtMiddleware(config.jwtSecret)

const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix , AuthRouter.route());
    app.use(ClassroomRouter.routePrefix , jwtCheck , ClassroomRouter.route())
}

export default AppRoutes;