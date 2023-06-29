import { getUserId } from '../modules/sessionTokenMiddleware';

const { addDataset, getDefinitionsFromDataset, getCriteriaFromDataset, deleteDataset, getUserFromDataset } = require('../Controller/datasetController');
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(getUserId);

router.post('/add', addDataset);
router.get('/:datasetName/definitions', getDefinitionsFromDataset);
router.get('/:datasetName/criteria', getCriteriaFromDataset);
router.delete('/:datasetName', deleteDataset);
router.get('/:datasetName/user', getUserFromDataset);

module.exports = router;