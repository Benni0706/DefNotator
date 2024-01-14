import { getUserId } from '../modules/sessionTokenMiddleware';

const { addAnnotation, updateAnnotation, getAnnotation } = require('../controller/annotationController')
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addAnnotation);
router.post('/update', updateAnnotation);
router.get('/:annotationId', getAnnotation);

module.exports = router;