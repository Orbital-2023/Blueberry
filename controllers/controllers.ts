import { Request, Response } from "express";
import { MeetingCodeModel as MeetingCode }  from "../models/MeetingCode.model";

// create a new meeting code 
export const createMeeting =  async (req: Request, res: Response) => {
    const {code, owner} = req.body

    try {
        const meeting = await MeetingCode.create({code, owner})
        res.status(200).send(meeting)
    } catch (error: any) { // will change later
        res.status(400).json({error: error.message})
    }
    
}

export const getEvent = async (req: Request, res: Response) => {
    const { google } = require("googleapis");

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
    try {
    const auth = new google.auth.GoogleAuth({
        credentials: process.env.GOOGLE_API_key,
        scopes: ["https://www.googleapis.com/auth/calendar.settings.readonly"]
    })

        const calendar = google.calendar({ version: "v3", auth });
        const response = await calendar.calendars.insert(body);
        console.log(response);
        return "success!!!!!";
    } catch (e) {
        console.log("Met with error: " + e);
    }
  
    // const response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    // });
  
    // const data = await response.json();
  
    // console.log(data)
  }