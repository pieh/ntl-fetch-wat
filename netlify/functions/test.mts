import type { Context } from "@netlify/functions";

export default async function handler(request: Request, context: Context) {
  // return Response.json({
  //   siteName: context.site.name,
  //   deployId: context.deploy.id,
  // });

  const url = `https://${context.deploy.id}--${context.site.name}.netlify.app/target`;
  // const url = `http://localhost:8888/target`;

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
    siteName: context.site.name,
    deployId: context.deploy.id,
  });
}

export const config = {
  path: "/",
};
