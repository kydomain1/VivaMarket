export default {
  async fetch(request, env) {
    try {
      if (!env.ASSETS) {
        return new Response("Static asset binding missing", { status: 500 });
      }
      return await env.ASSETS.fetch(request);
    } catch (err) {
      return new Response(`Worker error: ${err?.message || err}`, {
        status: 500,
      });
    }
  },
};

