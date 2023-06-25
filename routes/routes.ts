import express from "express"
const router = express.Router()
import { dummyData } from "..";
import { createMeeting, getEvent, passwordCheck } from "../controllers/controllers";

// routes
router.get("/api/", (req, res) => {
  res.json("Hello world");
});

router.get("/api/calendar/events", getEvent);

router.get("/api/calendar/dummy", async(req, res) => {
  res.json(dummyData);
});

router.post("/api/meeting/create", createMeeting) // deprecate later

router.post("/api/register", createMeeting)

router.post("/api/login", passwordCheck)

export default router