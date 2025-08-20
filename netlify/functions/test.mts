import type { Context } from "@netlify/functions";
import { Readable } from "node:stream";

export default async function handler(request: Request, context: Context) {
  // return Response.json({
  //   siteName: context.site.name,
  //   deployId: context.deploy.id,
  // });

  const url = `https://${context.deploy.id}--${context.site.name}.netlify.app/fn-target`;
  // const url = `http://localhost:8888/fn-target`;

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
      body: JSON.stringify({ hello: "from test1" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await r.json();
    console.log("POST1", data);
  } catch (e) {
    console.error("Error fetching POST1 from target:", e);
  }

  try {
    const req = new Request(url, {
      method: "POST",
      body: JSON.stringify({ hello: "from test2" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    req.body;
    const r = await fetch(req);
    const data = await r.json();
    console.log("POST2", data);
  } catch (e) {
    console.error("Error fetching POST2 from target:", e);
  }

  try {
    const readable = Readable.from(generate());

    const req = new Request(url, {
      method: "POST",
      body: Readable.toWeb(readable),
      headers: {
        "Content-Type": "application/json",
      },
    });
    req.body;
    const r = await fetch(req);
    const data = await r.json();
    console.log("POST3", data);
  } catch (e) {
    console.error("Error fetching POST3 from target:", e);
  }

  return Response.json({
    siteName: context.site.name,
    deployId: context.deploy.id,
  });
}

export const config = {
  path: "/fn-test",
};
