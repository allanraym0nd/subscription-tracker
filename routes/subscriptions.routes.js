import { Router } from "express";

const router = Router()

router.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }))
router.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }))
router.post('/', (req, res) => res.send({ title: 'CREATE subscriptions' }))
router.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }))
router.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }))
router.get('/user/:id', (req, res) => res.send({ title: 'GET all subscription for user' }))
router.put('/:id/cancel', (req, res) => res.send({ title: 'Cancel user subscription' }))
router.get('/upcoming-subscription', (req, res) => res.send({ title: 'GET upcoming-subscriptions ' }))

export default router;