const stream = new ReadableStream({
  async start(controller) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    controller.enqueue("{");
    await new Promise((resolve) => setTimeout(resolve, 200));
    controller.enqueue('"hello":');
    await new Promise((resolve) => setTimeout(resolve, 200));
    controller.enqueue('"stream"');
    await new Promise((resolve) => setTimeout(resolve, 200));
    controller.enqueue("}");
  },
});

const identityTransform = new TransformStream();
stream.pipeThrough(identityTransform);

debugger;

await new Promise((resolve) => setTimeout(resolve, 2000));

debugger;
