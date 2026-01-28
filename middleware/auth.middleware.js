import jwt from 'jsonwebtoken'
import User from '../models.js/user.model.js';
import { JWT_SECRET } from '../config/env.js';
const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]

        }
        if (!token) res.status(401).json({ message: 'Unauthorized', error: error.message })

        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await User.findById(decoded.userId)
        if (!user) return res.status(401).json({ message: `Unauthorized` })
        req.user = user // if it exists attach user to the request that is being made!

        next() // then forward it to the next part of the request
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message })
    }

}

export default authorize