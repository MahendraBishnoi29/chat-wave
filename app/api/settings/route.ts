import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { name, image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        image: image,
        name: name,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error: any) {
    console.log("Error updating profile", error?.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}
