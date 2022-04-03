import { Router } from "express";
const router = Router();

import { allCalendar, createDate } from "../controllers/calendarController";
//TODO: create all router
router.get("/", allCalendar);
router.post("/", createDate);
export default router;
