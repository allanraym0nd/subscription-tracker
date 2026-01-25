import { Router } from "express";

const router = Router()

router.get('/', () => res.send({ title: 'GET all subscriptions' }))