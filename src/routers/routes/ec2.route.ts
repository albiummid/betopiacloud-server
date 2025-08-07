import { Router } from "express";
import {
    createEC2,
    deleteEC2ById,
    getAllEC2,
    getEC2ById,
    updateEC2ById,
} from "../../controllers/ec2.controller";
import { authenticateJWT } from "../../services/auth.service";

const router = Router();
router.use(authenticateJWT);
router.get("/", getAllEC2);
router.post("/", createEC2);
router.get("/:id", getEC2ById);
router.post("/:id", updateEC2ById);
router.delete("/:id", deleteEC2ById);

export default router;
