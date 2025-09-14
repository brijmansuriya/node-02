import { assets } from "@utils/asset";

export function UserResource(user: User) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: assets(user.image as string),
    createdAt: user.createdAt,
  };
}

export function UsersResource(users:User[]) {
  return users.map(user => UserResource(user));
}
