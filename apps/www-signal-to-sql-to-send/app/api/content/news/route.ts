import { NextResponse } from "next/server";
import { getNewsArticles } from "@/services/content";

export const runtime = "edge";

export async function GET() {
  try {
    const articles = getNewsArticles();

    return NextResponse.json(articles, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
