import Subscription from "../models.js/subscription.model.js"

export const createSubscription = async () => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id

        })

        res.status(201).json({ success: true, data: subscription })

    } catch (e) {
        next(e)
    }
}