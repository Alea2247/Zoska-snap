import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "../../../../../../lib/pisma";

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Get total like count
    const likeCount = await prisma.like.count({
      where: {
        postId: params.postId,
      },
    });

    // If no user is logged in, just return the count
    if (!session?.user?.email) {
      return NextResponse.json({
        isLiked: false,
        likeCount,
      });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({
        isLiked: false,
        likeCount,
      });
    }

    // Check if user has liked the post
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: params.postId,
        },
      },
    });

    return NextResponse.json({
      isLiked: !!like,
      likeCount,
    });
  } catch (error) {
    console.error("[GET_LIKE_STATUS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 