import mongoose, { ConnectOptions } from "mongoose";
import configs from "../env";
import { logger } from "../libs/winston";

const clientOptions: ConnectOptions = {
    dbName: configs.DB_NAME,
    appName: configs.APP_NAME,
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
};

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * If an error occurs during the connection process, it throws an error with a descriptive message.
 *
 * -Uses `MONGO_URI` as the connection string.
 * - `clientOptions` contains additional configuration for Mongoose.
 * - Errors are properly handled and rethrown for better debugging.
 */

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(configs.MONGO_URI, clientOptions);
        logger.info(`Connected to the database successfully.`, {
            uri: configs.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        logger.error(`Error connecting to the database`, error);
    }
};

/**
 * Disconnects from the MongoDB database using Mongoose.
 *
 * This function attempts to disconnect from the database asynchronously.
 * If the disconnection is successful, a success message is logged.
 * If an error occurs, it is either re-thrown as a new Error (if it's an instance of Error)
 * or logged to the console.
 *
 */

export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        logger.warn(`Disconnected from the database successfully.`, {
            uri: configs.MONGO_URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        logger.error(
            `Error disconnecting from database: ${
                error instanceof Error ? error.message : ""
            }`
        );
    }
};
