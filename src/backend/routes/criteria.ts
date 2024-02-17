import express from 'express';
import cookieParser from 'cookie-parser';
import { getUserId } from '../modules/sessionTokenMiddleware';
import {addCriteria, assignCriteria, unassignCriteria, getCriteria, getCriterion} from '../controller/criteriaController';

export const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addCriteria);
router.post('/assign', assignCriteria);
router.post('/unassign', unassignCriteria);
router.get('/all', getCriteria);
router.get('/:criteriaId', getCriterion);
