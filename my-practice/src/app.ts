import express, { type Express } from 'express';
import { bankAccountRouter } from './accounts/BankAccount.router.js';
import { loggerMiddleware } from './shared/middleware/logger.middleware.js';
import type { Request, Response } from 'express';
import { apiRouter } from './api.router.js';


const app: Express = express()
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api', apiRouter);

app.use((req: Request, res: Response) => {
    return res.status(404).json({
        error: `Route ${req.method} ${req.url} not found`
    })
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Running at: http://127.0.0.1:8000`))