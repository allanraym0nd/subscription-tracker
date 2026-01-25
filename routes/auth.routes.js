import { Router } from "express";

const router = Router()

router.post('/sign-up', (req, res) => {
    res.send({ message: 'Sign Up' })
})

router.post('/sign-in', (req, res) => {
    res.send({ message: 'Sign In' })
})

router.post('/sign-out', (req, res) => {
    res.send({ message: 'Sign Out' })
})

export default router;