// workflow.routes.js
import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const router = Router();

// Upstash serve() typically exposes handlers - check what sendReminders actually is
router.post("/subscription/reminders", (req, res) => {
    return sendReminders(req, res);
});

export default router;