import { Request, Response } from "express";
import prisma from "@config/database";
import { UserResource, UserCollection } from "@resources/user.resource";
import { ApiResponse } from "@utils/response";
import {paginate} from "@utils/pagination"
import { UserType } from "@prisma/client";

export class UserController {
  public index = async(req: Request, res: Response) => {

    // const where = { status: false };
    const where = { 
      // status: true,
      // type: UserType.ADMIN,
      // email: "mansuriyabri@gmail.com",

      // createdAt: {
      //   gte: new Date("2026-09-01"),
      // },

      // name: {
      //   contains: "john",     // name contains 'john'
      //   mode: "insensitive",  // case-insensitive
      // },

      // email: {
      //   endsWith: "@gmail.com", // email ends with @gmail.com
      // },

      // id: {
      //   gt: 10,   // id greater than 10
      //   lt: 100,  // id less than 100
      //   not: 50,  // id not equal 50
      // },

      // createdAt: {
      //   gte: new Date("2025-09-01"),   // created after Sep 1
      //   lte: new Date("2025-09-14"),   // created before Sep 14
      // },

      // updatedAt: {
      //   gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last 7 days
      // },

      // type: { in: ["USER", "ADMIN"] },        // either USER or ADMIN

      // id: { notIn: [1, 2, 3] },    // id not in 1, 2, 3

      // OR: [
      //   { name: { contains: "john" } },
      //   { email: { contains: "doe" } },
      // ],
      // AND: [
      //   { status: true },
      //   { type: "USER" },
      // ],
      // NOT: [
      //   { email: { endsWith: "@spam.com" } }
      // ]

     };
    const limit = 10;
    const include = {
    };
    

    const result = await paginate(req, prisma.user,where,limit,include);

    // Apply Resource collection
    result.data = UserCollection(result.data);

    return ApiResponse.success(res, result);
  };

  public create = (req: Request, res: Response): void => {
    res.json({ message: "User controller working!" });
  };

  public update = (req: Request, res: Response): void => {
    res.json({ message: "User controller working!" });
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return ApiResponse.success(res, { user: UserResource(user) });
    // res.json({ message: "User controller working!" });
  };
}

// ✅ Export single instance
export const userController = new UserController();
