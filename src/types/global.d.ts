import { Prisma } from "@prisma/client";

// Extend Express Request
declare module "express-serve-static-core" {
  interface Request {
    filesStored?: Record<string, string>;
    user?: User;          
  }
}

// Global types for Prisma models
declare global {
  type User = Prisma.UserGetPayload<{ include: { _count: true,image: true } }>;

  // type User = Omit<Prisma.UserGetPayload<{ include: { _count: true, image: true } }>, "_count"> & {
  //   _count?: { posts: number }; // Optional
  // };

  // add more models as needed
}


// Prevent TS from complaining about "global" file
export {};
