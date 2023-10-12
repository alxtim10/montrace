import { NextRequest, NextResponse } from "next/server";
import { loginUser, logoutUser } from "../components/users/users.service";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.nextUrl.searchParams.get("token") || "";
    const user = await logoutUser(refreshToken);

    return NextResponse.json({
      message: "Logout successful",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
