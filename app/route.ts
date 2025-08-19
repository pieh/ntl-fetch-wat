import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (typeof globalThis.Netlify === "undefined") {
    globalThis.Netlify = {
      deploy: {
        id: "0",
      },
      site: {
        name: "test-site",
      },
    };
  }
  const url = `https://${globalThis.Netlify.deploy.id}--${globalThis.Netlify.site.name}.netlify.app/target`;
  // const url = `http://localhost:3000/target`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    console.log("GET", data);
  } catch (e) {
    console.error("Error fetching from target:", e);
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ hello: "from test" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await r.json();
    console.log("GET", data);
  } catch (e) {
    console.error("Error fetching from target:", e);
  }

  return Response.json({
    siteName: globalThis.Netlify.site.name,
    deployId: globalThis.Netlify.deploy.id,
  });
}

export const dynamic = "force-dynamic";
