import {hash} from "bcrypt";

import prisma from "@/app/libs/prismaDB";
import {NextResponse} from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const {email, password, name} = body;
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
};
