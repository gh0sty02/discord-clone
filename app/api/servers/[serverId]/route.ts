import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-profile";
import { db } from "@/lib/db";

export const PATCH = async (
  req: Request,
  { params: { serverId } }: { params: { serverId: string } }
) => {
  try {
    const profile = await getCurrentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, imageUrl } = await req.json();

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    console.log(server);

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
};
