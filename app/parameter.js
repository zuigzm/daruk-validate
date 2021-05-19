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

    // Ensure that default can be used normally
    for(let key in params) {
      if(key in thisParams) {
        thisParams[key] = params[key]
      } else {
        value[key] = params[key]
      }
    }

    console.log('value, thisParams', params, this.request.query, this.params)

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
