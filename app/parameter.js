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

    // Ensure that default can be used normally
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

/**
 * format a rule
 * - resolve abbr
 * - resolve `?`
 *
 * @param {Mixed} rule
 * @return {Object}
 * @api private
 */

function formatRule(rule) {
  rule = rule || {};
  if (typeof rule === "string") {
    rule = { type: rule };
  } else if (Array.isArray(rule)) {
    rule = { type: "enum", values: rule };
  } else if (rule instanceof RegExp) {
    rule = { type: "string", format: rule };
  }

  if (rule.type && rule.type[rule.type.length - 1] === "?") {
    rule.type = rule.type.slice(0, -1);
    rule.required = false;
  }

  return rule;
}
