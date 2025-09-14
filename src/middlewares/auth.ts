import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt";
import { ApiResponse } from "@utils/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log('authHeader', authHeader);

   


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log('unauthorized:::');
        return ApiResponse.unauthorized(res, "Unauthorized");
    }
    

    const token = authHeader.split(" ")[1];

     //block
    const blacklisted = await prisma.blacklistToken.findUnique({
        where: { token: token },
    });

    if (blacklisted) {
        return res.status(401).json(ApiResponse.error(res,"Token blacklisted",null,401));
    }

    try {
        // 1. Verify token
        const payload = verifyToken(token) as { id: number };

        // 2. Get user from DB
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            console.log('user not found');
            return res.status(401).json(ApiResponse.error(res,"user not found",null,401));
        }

        // 3. Attach to request
        console.log('auth user', user);
        
        req.user = user as unknown as User;

        next();
    } catch (err) {
        console.log('invalid token',err);
        return res.status(401).json(ApiResponse.error(res,"Invalid token",null,401));
    }
}
