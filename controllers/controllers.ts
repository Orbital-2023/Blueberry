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