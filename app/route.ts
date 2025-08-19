import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("what?", globalThis.Netlify);
  if (typeof globalThis.Netlify === "undefined") {
    globalThis.Netlify = {
      context: {
        deploy: {
          id: "0",
        },
        site: {
          name: "test-site",
        },
      },
    };
  }
  const url = `https://${globalThis.Netlify.context.deploy.id}--${globalThis.Netlify.context.site.name}.netlify.app/target`;
  // const url = `http://localhost:8888/target`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    console.log("GET", data);
  } catch (e) {
    console.error("Error fetching GET from target:", e);
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
    console.log("POST", data);
  } catch (e) {
    console.error("Error fetching POST from target:", e);
  }

  return Response.json({
    siteName: globalThis.Netlify.context.site.name,
    deployId: globalThis.Netlify.context.deploy.id,
  });
}

export const dynamic = "force-dynamic";
