import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    //verify the id to add
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);
    //check if the user is present (Iogged in)
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    //verify both user are not already friends
    const isAlreadyFriend = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriend) {
      return new Response("this person is already your friend!", {
        status: 400,
      });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    if (!hasFriendRequest) {
      return new Response("No friend requests", { status: 400 });
    }

    await db.sadd(`user:${session.user.id}:friends`, idToAdd);

    await db.sadd(`user:${idToAdd}:friends`, session.user.id);

    // await db.srem(`user:${idToAdd}:outbound_friend_requests`, session.user.id);
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid Request", { status: 400 });
  }
}
