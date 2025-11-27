export default {
  async fetch(request, env) {
    // Serve static assets from the configured bucket
    return env.ASSETS.fetch(request);
  },
};

