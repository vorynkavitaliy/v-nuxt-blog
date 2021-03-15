const consola = require("consola");
const { loadNuxt, build } = require("nuxt");
const app = require("./app");

// const config = require("../nuxt.config");

// config.dev = !(process.env.NODE_ENV === "production");

// async function start() {
//     const nuxt = new Nuxt(config);
//     const {
//         host = process.env.HOST || "127.0.0.1",
//         port = process.env.PORT || 4201
//     } = nuxt.options.server;

//     console.log(Builder);

//     if (config.dev) {
//         const builder = new Builder(nuxt);
//         await builder.build();
//     }
//     app.use(nuxt.render);

//     app.listen(port, host, () => {
//         consola.ready({
//             message: `Server listening on http://${host}:${port}`,
//             badge: true
//         });
//     });
// }
// start();

const isDev = process.env.NODE_ENV !== "production";

async function start() {
    const nuxt = await loadNuxt(isDev ? "dev" : "start");

    const {
        host = process.env.HOST || "127.0.0.1",
        port = process.env.PORT || 4201
    } = nuxt.options.server;

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
