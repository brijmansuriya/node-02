import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt";
import { ApiResponse } from "@utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(ApiResponse.error(res, "Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        // 1. Verify token
        const payload = verifyToken(token) as { id: number };

        // 2. Get user from DB
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            return res.status(401).json(ApiResponse.error(res,"User not found", 401));
        }

        // 3. Attach to request
        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json(ApiResponse.error(res,"Invalid token", 401));
    }
}
