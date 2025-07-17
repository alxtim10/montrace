import { extractBearerToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUserBudgets } from "../../components/budget/budget.service";

export async function GET(req: NextRequest) {
  try {
    const token = extractBearerToken(req)

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const budgetData = await getUserBudgets(token);

    return NextResponse.json({ data: budgetData });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}