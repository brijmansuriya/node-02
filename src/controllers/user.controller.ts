import { Request, Response } from "express";

export class UserController {
  public index = (req: Request, res: Response): void => {
    res.json({ message: "User controller working!" });
  };

  public create = (req: Request, res: Response): void => {
    res.json({ message: "User controller working!" });
  };

  public update = (req: Request, res: Response): void => {
    res.json({ message: "User controller working!" });
  };

  public delete = (req: Request, res: Response): void => {
    res.json({ message: "User controller working!" });
  };
}

// ✅ Export single instance
export const userController = new UserController();
