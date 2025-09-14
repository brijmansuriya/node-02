import { Request, Response } from "express";
import prisma from "@config/database";
import { UserType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserResource } from "@resources/user.resource";
import { ApiResponse } from "@utils/response";
import { signToken } from "@utils/jwt";
import jwt from "jsonwebtoken";


export class AuthController {
  public index = (req: Request, res: Response) => {
    res.json({ message: "Auth controller working!" });

  };

  public login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return ApiResponse.error(res, "User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log('isValid', isValid);

    if (!isValid) {
      return ApiResponse.error(res, "Invalid password");
    }

    // 3. Generate token
    console.log('user', user.id);
    
    const token = signToken({ id: user.id });

    return ApiResponse.success(res, {
      user: UserResource(user),
      token,
    });
  }

  public register = async (req: Request, res: Response): Promise<any> => {

    const { name, email, password } = req.body;
    const { image } = req.filesStored as any;

    // check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return ApiResponse.error(res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
      },
    });

    const token = signToken({ id: user.id });

    return ApiResponse.success(res, {
      user: UserResource(user),
      token,
    });
  }

  //profile
  public profileUpdate = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, email, password, type, status } = req.body;
    const { image } = req.filesStored as any;

    console.log(status);
    console.log(type);


    //check email is already exists
    // Check if another user (not the current user) already has this email
    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: parseInt(id) },
      },
    });

    if (emailExists) {
      return ApiResponse.error(res, "Email already exists");
    }

    let prismaType: UserType | undefined;

    if (req.body.type) {
      const upperType = req.body.type.toString().toUpperCase();

      if (!Object.values(UserType).includes(upperType as UserType)) {
        return res.status(400).json({ message: "Invalid user type" });
      }
      prismaType = upperType as UserType;

    }

    // Convert status string to boolean
    const prismaStatus = status?.toString().toLowerCase() == "true";

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password,
        image,
        status: prismaStatus,
        type: prismaType,
      },
    });

    return ApiResponse.success(res, { user: UserResource(user) });
  }

  //profile 
  public profile = async (req: Request, res: Response): Promise<Response> => {
    // get tockeg to id 
    console.log('profile user::::::::::::', req.user);
    
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
    });

    if (!user) {
      // user not found
      return ApiResponse.error(res, "User not found", null, 404);
    }

    return ApiResponse.success(res, { user: UserResource(user) });
  }


  public logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return ApiResponse.error(res, "No token provided");

      // Decode token expiry
      const decoded = jwt.decode(token) as { exp?: number };
      const expiresAt = decoded?.exp
        ? new Date(decoded.exp * 1000) // convert to ms
        : new Date(Date.now() + 60 * 60 * 1000); // fallback 1h

      await prisma.blacklistToken.create({
        data: { token, expiresAt },
      });

      return ApiResponse.success(res, { message: "Logged out successfully" });
  
  }

}
