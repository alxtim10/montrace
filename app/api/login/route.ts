import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "../components/users/users.service";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await req.json();
    const user = await loginUser(currentUser);

    return NextResponse.json({
      message: user.refreshToken,
      userId: user.userId,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
