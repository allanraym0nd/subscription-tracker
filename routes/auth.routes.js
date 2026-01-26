import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const router = Router()
router.use((req, res, next) => {
    console.log('Auth route hit:', req.method, req.path)
    next()
})


router.post('/sign-up', signUp)

router.post('/sign-in')

router.post('/sign-out')

export default router;