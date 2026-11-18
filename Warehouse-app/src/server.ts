import { app } from "./app.js";
import { env } from "./shared/config/env.js";
import { checkDbConnection } from "./shared/db/pool.js";
import { logger } from "./shared/lib/logger.js";

async function startServer(): Promise<void> {
    try {
        await checkDbConnection()
        const PORT = env.PORT;
        app.listen(PORT, () => logger.info(`Running at: http://127.0.0.1:${PORT}`));
    } catch (err) {
        logger.error({ err }, 'Failed to start server');
        process.exit(1);
    }
}

startServer();

