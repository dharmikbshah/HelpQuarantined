const user = require("./user");
const openroutes = require("./openroutes");

const constructorMethod = app => {
  
  app.use("/user", user);
  //open endpoints
  app.use("/fetch", openroutes)
  
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;