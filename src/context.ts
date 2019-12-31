import { Request, Response } from 'express';

import { Prisma } from './generated/prisma-client';

export interface Context {
    prisma: Prisma;
    req: Request;
    res: Response;
}
