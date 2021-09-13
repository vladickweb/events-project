const passport = require("passport");
module.exports = (app) => {
    // Base Url's
    app.use("/", require("./base.routes"));
    app.use("/", require("./login.routes"));
    app.use("/auth", require("./auth.routes"));
    app.use("/user", require("./user.routes"));
    app.use("/empresa", require("./company.routes"));
    app.use('/eventos', require('./events.routes'))
    app.use('/admin', require('./admin.routes'))
};