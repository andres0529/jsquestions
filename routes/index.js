const authRouter = require("./auth.router");
const gameRouter = require("./game.router");
const homeRouter = require("./home.router");
const myAccountRouter = require("./myAccount.router");

const routerApi = (app) => {
  app.use("/", homeRouter);
  app.use("/auth", authRouter);
  app.use("/game", gameRouter);
  app.use("/myaccount", myAccountRouter);
};

module.exports = routerApi;
