import express from 'express';
import cookieParser from 'cookie-parser';
import { getUserId } from '../modules/sessionTokenMiddleware';
import {addAnnotation, updateAnnotation, getAnnotation} from '../controller/annotationController';

export const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addAnnotation);
router.post('/update', updateAnnotation);
router.get('/:annotationId', getAnnotation);
