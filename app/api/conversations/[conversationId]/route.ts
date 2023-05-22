import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const deletedConversatoin = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser?.id],
        },
      },
    });

    return NextResponse.json(deletedConversatoin);
  } catch (error: any) {
    console.log(error, "Error deleting conversation");
    return new NextResponse("Internal error", { status: 500 });
  }
}
