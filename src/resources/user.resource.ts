import { assets } from "@utils/asset";
import { User } from "@prisma/client";

export function UserResource(user: User) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: assets(user.image as string),
    type: user.type.toString().toLowerCase(),
    status: user.status,
    createdAt: user.createdAt,
  };
}

export function UserCollection(users:User[]) {
  return users.map(user => UserResource(user));
}
