import aj from "../config/arcjet.js";

const arcJetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate Limit Exceeded' })
            if (decision.reason.isBot()) return res.status(403).json({ error: 'Bot Detected' })

            return res.status(403).json({ error: 'access denied' })
            next()

        }

    }
    catch (error) {
        console.log(`Arcjet Middleware error: ${error}`)
        next()

    }
}

export default arcJetMiddleware;