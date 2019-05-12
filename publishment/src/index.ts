import * as path from 'path';

import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import passport from 'passport';
import lusca from 'lusca';
import compression from 'compression';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';

import { MONGODB_URI, MONGODB_URI_DATABASE_NAME, SESSION_SECRET } from './config/secrets';
import * as renderer from './server/renderer';
import * as passportConfig from './config/passport';
import * as userController from './server/userController';

const secret = SESSION_SECRET;
const mongoUrl = MONGODB_URI;
const databaseName = MONGODB_URI_DATABASE_NAME;

const MongoStore = mongo(session);

mongoose
  .connect(`${mongoUrl}/${databaseName}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  });

export const adminStatic = express.static(path.resolve(__dirname, 'public'));

export const adminRouter: express.Router = express.Router();

adminRouter.use(compression());
adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({ extended: true }));
adminRouter.use(expressValidator());
adminRouter.use(
  session({
    secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true,
    }),
  }),
);
adminRouter.use(passport.initialize());
adminRouter.use(passport.session());
adminRouter.use(lusca.xframe('SAMEORIGIN'));
adminRouter.use(lusca.xssProtection(true));

adminRouter.use('/public', adminStatic);

adminRouter.post('/signup', userController.postSignup);
adminRouter.post('/signin', userController.postSignin);
adminRouter.get('/signout', userController.signout);
adminRouter.post('/forgot', userController.postForgot);
adminRouter.post('/reset/:token', userController.postReset);
adminRouter.get('/reset/:token', userController.getReset);
adminRouter.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
adminRouter.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
adminRouter.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);

// adminRouter.get('/login', userController.getLogin);
// adminRouter.get('/forgot', userController.getForgot);
// adminRouter.get('/signup', userController.getSignup);
// adminRouter.get('/account', passportConfig.isAuthenticated, userController.getAccount);

adminRouter.get('*', renderer.get);
