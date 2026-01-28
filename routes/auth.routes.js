import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const router = Router()
router.use((req, res, next) => {
    console.log('Auth route hit:', req.method, req.path)
    next()
})


router.post('/sign-up', signUp)

router.post('/sign-in', signIn)

router.post('/sign-out')

export default router;