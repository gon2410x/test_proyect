import { Router } from "express";
import {getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller";
import {signUp, signIn } from '../controllers/user.controller'
import { containerList } from "../controllers/container.controller";
import passport from 'passport'

const router = Router();

router.get("/containerlist", containerList);
router.get("/users", getUsers);
router.get("/users/:id", passport.authenticate('jwt', { session: false }), getUser);
router.put("/users/:id", passport.authenticate('jwt', { session: false }), updateUser);
router.delete("/users/:id", passport.authenticate('jwt', { session: false }),deleteUser);

//Agregar para jwt
router.post('/signup', signUp);
router.post('/signin', signIn);
// router.post('/token', refresh);


export default router;