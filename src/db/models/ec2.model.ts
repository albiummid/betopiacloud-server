import { model, Schema } from "mongoose";

const EC2Schema = new Schema(
    {
        name: { type: String, required: true },
        tags: [
            {
                type: String,
                required: true,
            },
        ],
        keyPair: {
            type: {
                type: String,
                default: null,
            },
            format: {
                type: String,
                enum: [".pem", ".ppk"],
                default: null,
            },
        },
        osImage: {
            label: {
                type: String,
                required: true,
            },
            imagePath: {
                type: String,
                required: true,
            },
        },
        osArch: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "running",
            enum: [
                "running",
                "stopped",
                "hibernated",
                "rebooting",
                "terminated",
            ],
        },
    },
    { timestamps: true }
);

const EC2 = model("EC2", EC2Schema);
export default EC2;
