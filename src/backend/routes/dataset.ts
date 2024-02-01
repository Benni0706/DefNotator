import { getUserId } from '../modules/sessionTokenMiddleware';

const { addDataset, getDefinitionsFromDataset, getCriteriaFromDataset, deleteDataset, getUserFromDataset, getAvailableDatasets } = require('../controller/datasetController');
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addDataset);
router.get('/:datasetName/definitions', getDefinitionsFromDataset);
router.get('/:datasetName/criteria', getCriteriaFromDataset);
router.delete('/:datasetName', deleteDataset);
router.get('/:datasetName/user', getUserFromDataset);
router.get('/available', getAvailableDatasets);

module.exports = router;
