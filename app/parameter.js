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
        ? this.request.query // query string => boolean
        : this.request.body;

      // copy
      params = Object.assign({}, value, thisParams);
    }

    const errors = parameter.validate(toBoolean(rules), params);

    for (let key in params) {
      if (key in thisParams) {
        thisParams[key] = params[key];
      } else {
        value[key] = params[key];
      }
    }

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

// query toBoolean
function toBoolean(rules) {
  for (let key in rules) {
    if (/bool/.test(rules[key]) || /bool/.test(rules[key].type)) {
      rules[key] = {
        convertType: (value) => (value === "false" ? false : true),
        ...(typeof rules[key] === "object"
          ? rules[key]
          : {
              type: rules[key],
            }),
      };
    }
  }

  return rules;
}
