import { NextResponse } from "next/server";

import { UserRole } from "@prisma/client";

import { currentRole } from "@/lib/user-auth";


export async function GET() {
  const role = await currentRole()

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 })
  }

  return new NextResponse(null, { status: 403 })
}