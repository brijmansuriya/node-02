import { assets } from "@utils/asset";
import { Post } from "@prisma/client";

export function PostResource(post: Post | null | undefined) {
  if (!post) return null;

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    image: assets(post.image as string),
    status: post.status,
    // createdAt: post.createdAt,
    // updatedAt: post.updatedAt,
  };
}

export function PostCollection(posts: Post[] | null | undefined | Post[]) {
  if (!posts) return [];
  return posts.map(post => PostResource(post));
}
