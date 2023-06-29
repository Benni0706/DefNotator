import { getUserId } from '../modules/sessionTokenMiddleware';

const { addAnnotation, updateAnnotation, getAnnotation } = require('../Controller/annotationController')
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(getUserId);

router.post('/add', addAnnotation);
router.post('/update', updateAnnotation);
router.get('/:annotationId', getAnnotation);

module.exports = router;