import { NextRequest, NextResponse } from "next/server";
import {
  getAllTrackerData,
  insertTrackerData,
} from "../components/tracker/tracker.service";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") || "";
    const trackerDatas = await getAllTrackerData(token);

    return NextResponse.json({ data: trackerDatas });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const trackerData = await insertTrackerData(reqData);

    return NextResponse.json({ data: trackerData, message: "Record Added" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
