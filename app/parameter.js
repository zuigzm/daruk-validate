const Parameter = require("parameter");
const errorVerify = require("./error");

module.exports = function (app, translate) {
  let parameter;

  if (typeof translate === "function") {
    parameter = new Parameter({
      translate,
    });
  } else {
    parameter = new Parameter();
  }

  app.context.verifyParams = function (rules, params) {
    if (!rules) {
      return;
    }

    if (!params) {
      params = ["GET", "HEAD"].includes(this.method.toUpperCase())
        ? this.request.query
        : this.request.body;
    }

    const errors = parameter.validate(rules, params);

    if (!errors) {
      return;
    }
    this.throw(422, "Validation Failed", {
      code: "INVALID_PARAM",
      errors: errors,
      params: params,
    });
  };

  return errorVerify;
};
