import EC2 from "../models/ec2.model";

export const getAllEC2Service = async () => {
    return EC2.find();
};

export const createEC2Service = async (data: any) => {
    const ec2 = new EC2(data);
    return ec2.save();
};

export const getEC2ByIdService = async (id: string) => {
    return EC2.findById(id);
};
