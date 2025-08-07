import { config } from "dotenv";
import { cleanEnv, num, str } from "envalid";

config({ path: ".env" });

const env = cleanEnv(process.env, {
    MONGO_URI: str({
        desc: "MongoDB URI is not defined in the configuration.",
    }),
    PORT: num({ default: 3000 }),
    NODE_ENV: str({
        choices: ["development", "test", "production", "staging"],
    }),
    JWT_SECRET: str({ desc: "JWT secret for signing tokens." }),
});

const configs = Object.freeze({
    DB_NAME: "BetopiaCloud",
    APP_NAME: "BetopiaCloud",
    MONGO_URI: env.MONGO_URI,
    PORT: env.PORT,
    NODE_ENV: env.NODE_ENV,
    JWT_SECRET: env.JWT_SECRET,
    LOG_LEVEL: "dev",
});

export default configs;
