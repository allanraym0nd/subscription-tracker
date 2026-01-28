import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', (req, res) => res.send({ title: 'CREATE user' }))
router.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }))
router.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }))

export default router;