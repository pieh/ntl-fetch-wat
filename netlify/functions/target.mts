export default async function handler(request: Request) {
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

export const config = {
  path: "/target",
};
