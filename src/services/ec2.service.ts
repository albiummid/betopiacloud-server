import EC2 from "../db/models/ec2.model";
import { NotFoundError } from "../libs/error/custom-error";

export const getAllEC2Service = async () => {
    return EC2.find();
};

export const createEC2Service = async (data: any) => {
    const ec2 = new EC2(data);
    return ec2.save();
};

export const getEC2ByIdService = async (id: string) => {
    const ec2 = await EC2.findById(id);
    if (!ec2) throw new NotFoundError("EC2 instance not found");
    return ec2;
};
