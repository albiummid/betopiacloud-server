import { Router } from "express";
import authRoutes from "./routes/auth.route";
import ec2Routes from "./routes/ec2.route";

const routerV1 = Router();
routerV1.use("/auth", authRoutes);
routerV1.use("/ec2", ec2Routes);
export default routerV1;
