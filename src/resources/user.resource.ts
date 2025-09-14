import { assets } from "@utils/asset";
import { User, Post} from "@prisma/client";

import { PostCollection } from "./post.resource";

export function UserResource(user: User) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: assets(user.image as string),
    type: user.type.toString().toLowerCase(),
    posts: user.posts ? PostCollection(user.posts) : [],
    status: user.status,
    createdAt: user.createdAt,
  };
}

export function UserCollection(users: User[]) {
  if(!users) return [];
  return users.map(user => UserResource(user));
}
