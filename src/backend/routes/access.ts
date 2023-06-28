import express from 'express';
import {getUserId} from '../modules/sessionTokenMiddleware';

const {addAccess, deleteAccess} =  require('../Controller/accessController');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());
router.use(getUserId);

router.post('/add', addAccess)
router.delete('/', deleteAccess)

module.exports = router;