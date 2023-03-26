const homeRouter = require("./home.router");

const routerApi = (app) => {
  app.use("/", homeRouter);
};

module.exports = routerApi;
