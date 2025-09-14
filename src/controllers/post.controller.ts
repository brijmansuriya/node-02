import { Request, Response } from "express";
import prisma from "@config/database";
import { UserResource } from "@resources/user.resource";
import { PostCollection, PostResource } from "@resources/post.resource";
import { UserCollection } from "@resources/user.resource";
import { User } from "@prisma/client";
import { ApiResponse } from "@utils/response";

export class PostController {

  public index = async(req: Request, res: Response) => {

  //  const posts = await prisma.post.create({
  //     data: {
  //       title: "Post 1",
  //       content: "Content 1",
  //       status: true,
  //       userId: req.user?.id as number,
  //     },
  //   });

  //  const post = await prisma.post.findMany({
  //     where: {
  //       userId: req.user?.id as number,
  //       status: true,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });

    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id as number,
      },
      include: {
        posts: true,
      },
    });

    // const postList = PostCollection(post)

    if(!user) return ApiResponse.error(res, "User not found");

    res.send({ 
      message: "Post controller working!",
       user : UserResource(user)
    });
  };

}

// ✅ Export single instance
export const postController = new PostController();
