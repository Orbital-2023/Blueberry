import express from "express"
const router = express.Router()
import { dummyData } from "..";
import { appendEmail, createMeeting, getEvent, getHello, getRaw, passwordCheck } from "../controllers/controllers";

// routes
router.get("/api/hello", getHello)

router.get("/api/calendar/events", getEvent);

router.get("/api/calendar/dummy", async(req, res) => {
  res.json(dummyData);
});

router.get("/api/calendar/raw", getRaw)

router.post("/api/meeting/create", createMeeting) // deprecate later

router.post("/api/register", createMeeting)

router.post("/api/login", passwordCheck)

router.post("/api/meeting/append", appendEmail)

export default router
