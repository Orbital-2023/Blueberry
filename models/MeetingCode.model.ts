import { model, Schema, Model, Document } from 'mongoose';

export interface IMeetCode extends Document {
    roomId: string;
    roomPassword: string;
    emails: string;
}

const MeetingCodeSchema: Schema = new Schema({
    code: {type: String, required: true},
    owner: {type: String, required: true},
    emails: {type: String, required: true},
}, {timestamps: true})

export const MeetingCodeModel: Model<IMeetCode> = model<IMeetCode>('MeetingCode', MeetingCodeSchema)