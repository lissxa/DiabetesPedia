import Hapi from "@hapi/hapi";
import usersRoutes from "./routes/users.js";

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
        additionalHeaders: ["cache-control", "x-requested-with"],
      },
    },
  });

  server.events.on("response", function (request) {
    console.log(
      `${request.info.remoteAddress}: ${request.method.toUpperCase()} ${
        request.path
      } --> ${request.response.statusCode}`
    );
  });

  server.ext("onPreResponse", (request, h) => {
    const response = request.response;

    if (response.isBoom) {
      console.error("Error:", response);
      return h
        .response({
          status: "error",
          message: response.message || "Internal Server Error",
        })
        .code(response.output.statusCode || 500);
    }

    return h.continue;
  });

  server.route(usersRoutes);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h
        .response({
          status: "success",
          message: "DiabetesPedia API is running!",
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || "development",
        })
        .code(200);
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
  console.log("Environment:", process.env.NODE_ENV || "development");
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

init().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
