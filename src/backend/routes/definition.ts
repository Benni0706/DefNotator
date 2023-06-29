import { getUserId } from '../modules/sessionTokenMiddleware';

const { addDefinition, assignDefinition, unassignDefinition, getDefinitions, getDefinition } = require('../Controller/definitionController')
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(getUserId);

router.post('/add', addDefinition);
router.post('/assign', assignDefinition);
router.post('/unassign', unassignDefinition);
router.get('/all', getDefinitions);
router.get('/:definitionId', getDefinition);

module.exports = router;