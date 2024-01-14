import { getUserId } from '../modules/sessionTokenMiddleware';

const { addAccess, deleteAccess } =  require('../controller/accessController');
const cookieParser = require('cookie-parser');
const express = require('express');

const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(getUserId);

router.post('/add', addAccess)
router.delete('/', deleteAccess)

module.exports = router;