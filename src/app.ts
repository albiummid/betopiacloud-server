// Emoji favicon route

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectToDatabase } from "./db";
import configs from "./env";
import { errorMiddleware } from "./middlewares/error.middleware";
import routerV1 from "./routers/router.v1";
dotenv.config();

const app = express();
app.get("/favicon.ico", (req, res) => {
    const emoji = "🦄";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><text y="50%" x="50%" text-anchor="middle" dominant-baseline="central" font-size="52">${emoji}</text></svg>`;
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
});

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "http://103.138.150.141:3000"],
        credentials: true,
    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Emoji favicon route
app.get("/favicon.ico", (req, res) => {
    const emoji = "🦄";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><text y="50%" x="50%" text-anchor="middle" dominant-baseline="central" font-size="52">${emoji}</text></svg>`;
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
});

app.use("/api/v1", routerV1);

// Fallback response for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

const PORT = configs.PORT;

(async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Access the API at http://localhost:${PORT}/api/v1`);
    });
})();
