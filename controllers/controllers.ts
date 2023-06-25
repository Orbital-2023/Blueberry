import { Request, Response } from "express";
import { MeetingCodeModel as MeetingCode }  from "../models/MeetingCode.model";
import { google } from 'googleapis';

// create a new meeting code 
export const createMeeting =  async (req: Request, res: Response) => {
    const {roomId, roomPassword, emails} = req.body

    try {
        const meeting = await MeetingCode.create({roomId, roomPassword, emails})
        res.status(200).send(meeting)
    } catch (error: any) { // will change later
        res.status(400).json({error: error.message})
    }
    
}

export const getEvent = async (req: Request, res: Response) => {
  const emails = process.env.TEST_EMAILS!.split(", ");

  const items = emails.map((email) => {
      return {
        id: email,
      };
  });

  const requestBody = {
    "items": items,
    "timeMin": "2023-06-25T00:00:00+08:00",
    "timeMax": "2023-07-01T00:00:00+08:00",
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

export const passwordCheck = async (req: Request, res: Response) => {
  const {roomId, roomPassword} = req.body

  const check = await MeetingCode.find({ roomId: roomId, roomPassword: roomPassword})

  console.log(check.length)

  if (check.length != 0) {
    res.status(200).json("success")
  }

  res.status(404).json("username or password is wrong")
}