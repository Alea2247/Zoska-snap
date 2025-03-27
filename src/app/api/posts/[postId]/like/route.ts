import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import prisma from "../../../../../lib/pisma";

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { postId } = params;

    // Check if the user already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userId: user.id,
          postId,
        },
      });
    }

    // Get updated like count
    const likeCount = await prisma.like.count({
      where: { postId },
    });

    return NextResponse.json({ liked: !existingLike, likeCount });
  } catch (error) {
    console.error("[LIKE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}