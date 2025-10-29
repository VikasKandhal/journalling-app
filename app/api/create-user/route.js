import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new Response("Not authenticated", { status: 401 });
  }

  // Check if user exists in DB
  const existing = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  // Create new user if not found
  if (!existing) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl,
      },
    });
  }

  return new Response("User synced", { status: 200 });
}
