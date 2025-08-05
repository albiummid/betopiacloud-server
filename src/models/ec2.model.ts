import { Document, model, Schema } from "mongoose";

export interface IEC2 extends Document {
    name: string;
    type: string;
    status: string;
}

const EC2Schema = new Schema<IEC2>(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

const EC2 = model<IEC2>("EC2", EC2Schema);
export default EC2;
