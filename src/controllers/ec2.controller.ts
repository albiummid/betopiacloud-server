import { Request, Response } from "express";
import EC2 from "../db/models/ec2.model";
import { handleControllerAsync } from "../middlewares/controller.middleware";
import { getAllEC2Service, getEC2ByIdService } from "../services/ec2.service";

export const getAllEC2 = async (req: Request, res: Response) => {
    try {
        const ec2s = await getAllEC2Service();
        res.json(ec2s);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch EC2 instances" });
    }
};

export const createEC2 = handleControllerAsync(
    async (req: Request, res: Response) => {
        const instance = await EC2.create(req.body);
        res.json({
            success: true,
            message: "Instance created",
            data: instance,
        });
    }
);

export const getEC2ById = handleControllerAsync(
    async (req: Request, res: Response) => {
        const ec2 = await getEC2ByIdService(req.params.id);

        res.json({
            success: true,
            data: ec2,
        });
    }
);

export const updateEC2ById = handleControllerAsync(async (req, res) => {
    const ec2 = await getEC2ByIdService(req.params.id);
    const updated = await EC2.findByIdAndUpdate(ec2._id, req.body, {
        new: true,
        runValidators: true,
    });
    res.json({ success: true, message: "Instance updated", data: updated });
});

export const deleteEC2ById = handleControllerAsync(async (req, res) => {
    const ec2 = await getEC2ByIdService(req.params.id);
    await EC2.findByIdAndDelete(ec2._id);
    res.json({
        success: true,
        message: "EC2 instance deleted",
    });
});
