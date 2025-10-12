
import { NextResponse } from "next/server";

// Optional: import Prisma if you want DB health check
// import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Basic checks
    const uptime = process.uptime();
    const timestamp = new Date().toISOString();

    return NextResponse.json(
      {
        status: "ok",
        uptime,
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
