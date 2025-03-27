import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "../../../../lib/pisma";

export async function DELETE(
  request: Request,
  { params }: { params: { commentId: string } }
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

    // Check if comment exists and belongs to the user
    const comment = await prisma.comment.findUnique({
      where: { id: params.commentId },
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    if (comment.userId !== user.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: params.commentId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE_COMMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 