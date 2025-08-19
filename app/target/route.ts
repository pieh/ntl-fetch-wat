import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let data = undefined;
  if (request.method === "POST") {
    data = await request.json();
  }

  console.log({
    method: request.method,
    data,
  });

  return Response.json({ hello: "world", data });
}

export async function POST(request: NextRequest) {
  let data = undefined;
  if (request.method === "POST") {
    data = await request.json();
  }

  console.log({
    method: request.method,
    data,
  });

  return Response.json({ hello: "world", data });
}
