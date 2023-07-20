import { Request, Response } from "express";
import { IMeetCode, MeetingCodeModel as MeetingCode }  from "../models/MeetingCode.model";
import { google } from 'googleapis';
import { Error } from "mongoose";
import MagicCalculation from "./helperFn";

interface BusyEvent {
  start: string;
  end: string;
}

interface BusySchedule {
  [email: string]: {
    busy: BusyEvent[];
  };
}

function convertToRFC3339(dateString: string): string | null {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateString.match(dateRegex);

  if (!match) {
    return null; // Invalid input format, return null or throw an error based on your preference.
  }

  const [_, year, month, day] = match;
  const rfc3339String = `${year}-${month}-${day}T00:00:00.000Z`;

  return rfc3339String;
}

function formatTime(timeStr: string): string {
  const time = new Date(timeStr);
  return time.toLocaleString('en-US', { hour: 'numeric', hour12: true, timeZone: 'UTC'}).toLowerCase().toLowerCase().replace(/\s/g, '');
}

function convertToDayArray(schedule: BusySchedule): Record<string, string[]> {
  const daysSchedule: Record<string, string[]> = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  };

  for (const email in schedule) {
    const details = schedule[email];
    for (const event of details.busy) {
      const start = formatTime(event.start);
      const end = formatTime(event.end);

      const dayOfWeek = new Date(event.start).toLocaleString('en-US', { weekday: 'short' });
      const dayKey = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

      daysSchedule[dayKey].push(start, end);
    }
  }
  return daysSchedule;
}

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

// deprecated, dont use anymore
export const deprecatedGetEvents = async (req: Request, res: Response) => {
  const emails = process.env.TEST_EMAILS!.split(", ");

  const items = emails.map((email) => {
      return {
        id: email,
      };
  });

  const requestBody = {
    "items": items,
    "timeMin": "2023-06-26T22:42:59+08:00",
    "timeMax": "2023-07-02T22:42:59+08:00",
    "timeZone": "Asia/Singapore"
  }

  try {
      const calendar = google.calendar({ version: "v3", auth: process.env.GOOGLE_API_KEY });
      const response = await calendar.freebusy.query({requestBody});

      if (response.data.calendars == null) {
        throw Error
      }

      const schedule: BusySchedule = response.data.calendars as BusySchedule

      const daysSchedule = convertToDayArray(schedule)
      res.status(200).json(daysSchedule)

  } catch (e: any) {
      res.status(400).json({e: e.mesage})
  }
}

export const getEvents = async (req: Request, res: Response) => {
  const {roomId} = req.body

  let items
  let startDate 
  let endDate
  try {
    const meet = await MeetingCode.findOne({ roomId: roomId, })
    if (meet == null){
      throw console.error("find error")
    }

    const emails = meet.emails.split(", ");
    
    startDate = meet?.startDate ?? "2023-06-26T22:42:59+08:00"
    endDate = meet?.endDate ?? "2023-07-02T22:42:59+08:00"

    items = emails.map((email) => {
    return {
      id: email,
    };

});
  } catch (error: any) { // will change later
      res.status(400).json({error: error.message})
  }


  const requestBody = {
    "items": items,
    "timeMin": convertToRFC3339(startDate as string),
    "timeMax": convertToRFC3339(endDate as string),
    "timeZone": "Asia/Singapore"
  }

  try {
      const calendar = google.calendar({ version: "v3", auth: process.env.GOOGLE_API_KEY });
      const response = await calendar.freebusy.query({requestBody});

      if (response.data.calendars == null) {
        throw Error
      }

      res.status(200).json(MagicCalculation(response.data.calendars as BusySchedule))

  } catch (e: any) {
      res.status(400).json({e: e.mesage})
  }
}

// password equality check for login
export const passwordCheck = async (req: Request, res: Response) => {
  const {roomId, roomPassword} = req.body

  const check = await MeetingCode.find({ roomId: roomId, roomPassword: roomPassword})

  if (check.length != 0) {
    res.status(200).json(await MeetingCode.findOne({ roomId: roomId, }))
  }

  res.status(404).json("username or password is wrong")
}


// trial function
export const getHello = (req: Request, res: Response) => {
  res.json("Hello world")
}

// appends an email in the body into the database given the right roomId and passoword
export const appendEmail =  async (req: Request, res: Response) => {

  const {roomId, email} = req.body

  try {
    const meet = await MeetingCode.findOne({ roomId: roomId, })
    if (meet == null){
      throw console.error("find error")
    }
    const comma = ", "
    meet.emails = meet?.emails.concat(comma, email)
    meet.save()

    res.status(200).json(await MeetingCode.findOne({ roomId: roomId, }))
  } catch (error: any) { // will change later
      res.status(400).json({error: error.message})
  }

}

export const timeUpdate =  async (req: Request, res: Response) => {

  const {roomId, startDate, endDate} = req.body

  try {
    const meet = await MeetingCode.findOne({ roomId: roomId, })
    if (meet == null){
      throw console.error("find error")
    }
    meet.startDate = startDate
    meet.endDate = endDate

    meet.save()

    res.status(200).json("updated time")
  } catch (error: any) { // will change later
      res.status(400).json({error: error.message})
  }

}