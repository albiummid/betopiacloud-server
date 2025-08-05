import { Request, Response } from "express";
import {
    createEC2Service,
    getAllEC2Service,
    getEC2ByIdService,
} from "../services/ec2.service";

export const getAllEC2 = async (req: Request, res: Response) => {
    try {
        const ec2s = await getAllEC2Service();
        res.json(ec2s);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch EC2 instances" });
    }
};

export const createEC2 = async (req: Request, res: Response) => {
    try {
        const ec2 = await createEC2Service(req.body);
        res.status(201).json(ec2);
    } catch (err) {
        res.status(500).json({ error: "Failed to create EC2 instance" });
    }
};

export const getEC2ById = async (req: Request, res: Response) => {
    try {
        const ec2 = await getEC2ByIdService(req.params.id);
        if (!ec2)
            return res.status(404).json({ error: "EC2 instance not found" });
        res.json(ec2);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch EC2 instance" });
    }
};
