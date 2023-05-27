import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const credentials = process.env.CREDENTIALS
const { google } = require("googleapis");
const fetch = require('node-fetch') 

const oauth2Client = new google.auth.OAuth2(credentials)

google.options({auth: oauth2Client});

const calendar = google.calendar({
  version: "v3",
});

app.get("/", (req: Request, res: Response) => {
  res.json("Hello world");
});

app.get("/api/calendar/events", async (req, res) => {
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
	method: 'post',
	body: JSON.stringify(body),
  "key": "AIzaSyAbaIGJLDQqhVYmaot3zmtPykU6Zy7kpMo"
  });

  const data = await response.json();

  console.log(data);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
