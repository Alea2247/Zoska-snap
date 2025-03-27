"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "../../../lib/pisma";

type Post = {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  likes: { userId: string }[];
  comments: { id: string }[];
};

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      likes: true,
      comments: true, // Include comments to count them
      user: true,
    },
  });

  return posts.map((post) => ({
    id: post.id,
    userId: post.userId,
    imageUrl: post.imageUrl,
    caption: post.caption,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    user: {
      name: post.user.name,
      image: post.user.image,
    },
    likes: post.likes.length,
    comments: post.comments.length, // Count the number of comments
    isLiked: post.likes.some((like) => like.userId === "current-user-id"), // Replace with actual user ID
  }));
};