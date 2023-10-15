const Parameter = require("parameter");
const errorVerify = require("./error");

module.exports = function (app, options) {
  const parameter = new Parameter(options);

  app.context.verifyParams = function (rules, params) {
    let value;
    let thisParams = this.params;
    if (!rules) {
      return;
    }

    if (!params) {
      value = ["GET", "HEAD"].includes(this.method.toUpperCase())
        ? this.request.query
        : this.request.body;

      // copy
      params = Object.assign({}, value, thisParams);
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
