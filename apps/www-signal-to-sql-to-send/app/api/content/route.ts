import { NextResponse } from "next/server";
import { getAllContent } from "@/services/content";

// export const runtime = "edge";

export async function GET() {
  try {
    const content = getAllContent();

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
