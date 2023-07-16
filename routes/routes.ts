import express from "express"
const router = express.Router()
import { dummyData } from "..";
import { appendEmail, createMeeting, deprecatedGetEvents, getHello, getEvents, passwordCheck } from "../controllers/controllers";

// routes
router.get("/api/hello", getHello)

router.get("/api/calendar/old/events", deprecatedGetEvents);

router.get("/api/calendar/dummy", async(req, res) => {
  res.json(dummyData);
});

router.get("/api/calendar/events", getEvents)

router.post("/api/register", createMeeting)

router.post("/api/login", passwordCheck)

router.post("/api/meeting/append", appendEmail)

export default router
