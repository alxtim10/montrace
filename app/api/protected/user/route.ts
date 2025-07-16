import { extractBearerToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../components/users/users.service";

export async function GET(req: NextRequest) {
    try {
      const token = extractBearerToken(req)
  
      if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
      const userData = await getUser(token);
  
      return NextResponse.json({ data: userData });
    } catch (error: any) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }