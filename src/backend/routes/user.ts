import { getUserId } from '../modules/sessionTokenMiddleware';

const { addUser, getUser, login, logout, deleteUser, getDatasetsFromUser } = require('../controller/userController');
const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/add', addUser);
router.get('/', getUserId, getUser);
router.post('/login', login);
router.post('/logout', getUserId, logout);
router.delete('/', getUserId, deleteUser);
router.get('/datasets', getUserId, getDatasetsFromUser);

module.exports = router;