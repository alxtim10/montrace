import { extractBearerToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { addNewBudget, getUserBudgets } from "../../components/budget/budget.service";

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

export async function POST(req: NextRequest) {
  try {
    const newBudget = await req.json();
    const user = await addNewBudget(newBudget);
    return NextResponse.json({status: 200, data: user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}
