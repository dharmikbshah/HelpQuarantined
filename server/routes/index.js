const user = require("./user");

const constructorMethod = app => {
  
  app.use("/user", user);
  
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;