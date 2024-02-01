import express from 'express';
import cookieParser from 'cookie-parser';
import { getUserId } from '../modules/sessionTokenMiddleware';
import { addAccess, deleteAccess } from '../controller/accessController';

export const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addAccess)
router.delete('/', deleteAccess)
