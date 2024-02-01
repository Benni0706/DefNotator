import express from 'express';
import cookieParser from 'cookie-parser';
import {getUserId} from '../modules/sessionTokenMiddleware';
import {addDataset, getDefinitionsFromDataset, getCriteriaFromDataset, deleteDataset, getUserFromDataset} from '../controller/datasetController';

export const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(getUserId);

router.post('/add', addDataset);
router.get('/:datasetName/definitions', getDefinitionsFromDataset);
router.get('/:datasetName/criteria', getCriteriaFromDataset);
router.delete('/:datasetName', deleteDataset);
router.get('/:datasetName/user', getUserFromDataset);
