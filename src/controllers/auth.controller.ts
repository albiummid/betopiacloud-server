import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../db/models/user.model";
import {
    BadRequestError,
    UnauthorizedError,
    ValidationError,
} from "../libs/error/custom-error";
import { handleControllerAsync } from "../middlewares/controller.middleware";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = handleControllerAsync(
    async (req: Request, res: Response) => {
        const { email, firstName, lastName, password } = req.body;
        let user = await User.findOne({ email });
        if (user) throw new ValidationError("User already registered");
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
);

export const login = handleControllerAsync(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).lean();
        if (!user) throw new BadRequestError("User not registered");
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) throw new UnauthorizedError("Incorrect user");
        const token = jwt.sign({ id: user._id, email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            success: true,
            data: {
                user: { ...user, password: undefined },
                token,
            },
        });
    }
);
