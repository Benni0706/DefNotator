import { getUserId } from '../modules/sessionTokenMiddleware';

const { addCriteria, assignCriteria, unassignCriteria, getCriteria, getCriterion } = require('../controller/criteriaController');
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addCriteria);

router.post('/assign', assignCriteria);

router.post('/unassign', unassignCriteria);

router.get('/all', getCriteria);

router.get('/:criteriaId', getCriterion);

module.exports = router;