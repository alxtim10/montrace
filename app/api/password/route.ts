import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "../components/users/users.service";

export async function PUT(req: NextRequest) {
  try {
    const newData = await req.json();
    const user = await changePassword(newData);

    return NextResponse.json({
      message: "Password Changed",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
