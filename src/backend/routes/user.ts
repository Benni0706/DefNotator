import express from 'express';
import cookieParser from 'cookie-parser';
import { getUserId } from '../modules/sessionTokenMiddleware';
import { addUser, getUser, getUserByName, login, logout, deleteUser, getDatasetsFromUser } from '../controller/userController';

export const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/add', addUser);
router.get('/', getUserId, getUser);
router.post('/login', login);
router.post('/logout', getUserId, logout);
router.delete('/', getUserId, deleteUser);
router.get('/datasets', getUserId, getDatasetsFromUser);
router.get('/by-name/:userName', getUserByName);
