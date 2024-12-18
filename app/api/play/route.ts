import { getSudoku } from "@/utils/getSudoku";

export async function GET() {
  const data = await getSudoku();
  return Response.json({ data });
}
