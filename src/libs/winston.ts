import winston from "winston";
import configs from "../env";

const { combine, timestamp, json, errors, align, printf, colorize } =
    winston.format;

// Define the transports array to hold different logging transports
const transports: winston.transport[] = [];

// If the application is not running in production, add a console transport
if (configs.NODE_ENV !== "production") {
    transports.push(
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }), // Add colors to log levels
                timestamp({
                    format: "YYYY-MM-DD hh:mm:ss A", // Add timestamp to logs
                }),
                align(),
                printf(({ timestamp, level, message, ...meta }) => {
                    const metaStr = Object.keys(meta).length
                        ? `\n${JSON.stringify(meta)}`
                        : "";
                    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
                })
            ),
        })
    );
}

// Create a logger instance for using Winston
export const logger = winston.createLogger({
    level: configs.LOG_LEVEL, // info as default
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports,
    silent: configs.NODE_ENV === "test", // disable logging on test environment
});
