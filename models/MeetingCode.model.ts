import { model, Schema, Model, Document } from 'mongoose';

export interface IMeetCode extends Document {
    code: string;
    owner: string;
}

const MeetingCodeSchema: Schema = new Schema({
    code: {type: String, required: true},
    owner: {type: String, required: true},
}, {timestamps: true})

export const MeetingCodeModel: Model<IMeetCode> = model<IMeetCode>('MeetingCode', MeetingCodeSchema)