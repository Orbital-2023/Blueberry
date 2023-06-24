import { Request, Response } from "express";
import { MeetingCodeModel as MeetingCode }  from "../models/MeetingCode.model";
import { google } from 'googleapis';

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
    const requestBody = {
      "calendarExpansionMax": 10,
      "groupExpansionMax": 10,
      "items": [
        {
          "id": process.env.DUMMY_EMAIL
        }
      ],
      "timeMin": "2023-05-01T00:00:00+08:00",
      "timeMax": "2023-05-31T23:59:59+08:00",
      "timeZone": "Asia/Singapore"
    }

    try {
        const calendar = google.calendar({ version: "v3", auth: process.env.GOOGLE_API_KEY });
        const response = await calendar.freebusy.query({requestBody});
        res.status(200).json(response)
    } catch (e: any) {
        res.status(400).json({e: e.mesage})
    }
  }