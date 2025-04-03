import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ isLiked: false, likeCount: 0 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ isLiked: false, likeCount: 0 });
    }

    const like = await prisma.like.findFirst({
      where: {
        userId: user.id,
        postId: params.postId,
      },
    });

    const likeCount = await prisma.like.count({
      where: {
        postId: params.postId,
      },
    });

    return NextResponse.json({ isLiked: !!like, likeCount });
  } catch (error) {
    console.error("[GET_LIKE_STATUS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        postId: params.postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: params.postId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error("[TOGGLE_LIKE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 