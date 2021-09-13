const passport = require("passport");

module.exports = (app) => {
  // Base Url's
  app.use("/", require("./base.routes"));
  app.use("/auth", require("./auth.routes"));
  app.use("/login", require("./login.routes"));
  app.use("/user", require("./user.routes"));
  app.use("/empresa", require("./company.routes"));
};
