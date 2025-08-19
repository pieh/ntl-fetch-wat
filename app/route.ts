import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  if (typeof Netlify === "undefined") {
    globalThis.Netlify = {
      deploy: {
        id: "0",
      },
      site: {
        name: "test-site",
      },
    };
  }
  // const url = `https://${Netlify.deploy.id}--${Netlify.site.name}.netlify.app/target`;
  const url = `http://localhost:3000/target`;

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
    siteName: Netlify.site.name,
    deployId: Netlify.deploy.id,
  });
}

export const dynamic = "force-dynamic";
