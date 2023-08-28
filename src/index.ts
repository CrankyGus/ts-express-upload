// import loggerMiddleware, { log } from "./middlewares/logger";

import { bootstrap } from "./app";

// const path = __dirname.split("\\").slice(0, -1).join("\\");

// app.get("/", loggerMiddleware, (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/images/:filename", loggerMiddleware, (req, res) => {
//   res.sendFile(path + "/public/images/" + req.params.filename);
// });

// app.get("/videos/:filename", loggerMiddleware, (req, res) => {});

bootstrap();
