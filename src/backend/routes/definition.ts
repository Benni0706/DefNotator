import express from 'express';
import cookieParser from 'cookie-parser';
import { getUserId } from '../modules/sessionTokenMiddleware';
import { addDefinition, assignDefinition, unassignDefinition, getDefinitions, getDefinition } from '../controller/definitionController'

export const router = express.Router();

router.use(cookieParser());
router.use(getUserId);

router.post('/add', addDefinition);
router.post('/assign', assignDefinition);
router.post('/unassign', unassignDefinition);
router.get('/all', getDefinitions);
router.get('/:definitionId', getDefinition);
