import { NextRequest } from "next/server";
import { handleChatRequest } from "../_shared/api/handler";

export const runtime = "edge";

export async function POST(req: NextRequest): Promise<Response> {
  return handleChatRequest(req);
}
