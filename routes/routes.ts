import express from "express"
const router = express.Router()
import { dummyData } from "..";

// routes
router.get("/", (req, res) => {
  res.json("Hello world");
});

router.get("/api/calendar/events", async (req, res) => {
  const body = {
    "calendarExpansionMax": 10,
    "groupExpansionMax": 10,
    "items": [
      {
        "id": "primary"
      }
    ],
    "timeMin": "2023-05-01T00:00:00+08:00",
    "timeMax": "2023-05-31T23:59:59+08:00",
    "timeZone": "Asia/Singapore"
  }

  const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
	method: 'POST',
	body: JSON.stringify(body),
  });

  const data = await response.json();

  console.log(data)
});

router.get("/api/calendar/dummy", async(req, res) => {
  res.json(dummyData);
});

export default router