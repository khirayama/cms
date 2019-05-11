import * as path from 'path';

import express from 'express';

import * as renderer from './server/renderer';

export const adminStatic = express.static(path.resolve(__dirname, 'public'));

export const adminRouter: express.Router = express.Router();
adminRouter.get('*', renderer.get);
