const consola = require('consola')
const { loadNuxt, build } = require('nuxt')
const app = require("./app");

const isDev = process.env.NODE_ENV !== "production";

async function start() {
    const nuxt = await loadNuxt(isDev ? "dev" : "start");

    const { host, port } = nuxt.options.server;

    await nuxt.ready();

    if (isDev) {
        build(nuxt);
    }

    app.use(nuxt.render);

    app.listen(port, host, () => {
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        });
    });
}
start();
