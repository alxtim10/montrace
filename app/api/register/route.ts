import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "../components/users/users.service";

export async function POST(req: NextRequest) {
  try {
    const newUser = await req.json();
    const user = await registerUser(newUser);
    return NextResponse.json({status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
