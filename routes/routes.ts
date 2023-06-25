import express from "express"
const router = express.Router()
import { dummyData } from "..";
import { createMeeting, getEvent } from "../controllers/controllers";

// routes
router.get("/", (req, res) => {
  res.json("Hello world");
});

router.get("/api/calendar/events", getEvent);

router.get("/api/calendar/dummy", async(req, res) => {
  res.json(dummyData);
});

router.post("/api/meeting/create", createMeeting) // deprecate later

router.post("/api/register", createMeeting)

export default router