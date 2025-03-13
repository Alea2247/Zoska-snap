"use server";

import { prisma } from "../../api/auth/[...nextauth]/prizma";

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  } catch (error) {
    throw new Error("Nastala chyba pri načítavaní príspevkov");
  }
} 