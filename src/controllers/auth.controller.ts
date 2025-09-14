import { Request, Response } from "express";
import prisma from "@config/database";
import bcrypt from "bcryptjs";
import { UserResource } from "@resources/user.resource";
import { ApiResponse } from "@utils/response";
import { signToken } from "@utils/jwt";


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

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
      return ApiResponse.error(res, "Invalid password");
    }

    // 3. Generate token
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
  public profileUpdate = async (req: Request, res: Response): User => {
    const { id } = req.params;
    console.log(id);

    const { name, email, password } = req.body;
    const { image } = req.filesStored as any;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password, image },
    });

    return ApiResponse.success(res, { user: UserResource(user) });
  }

  //profile 
  public profile =async(req:Request,res:Response) : User => {
    
    // get tockeg to id 
    // const user = await prisma.user

  }
}
