const parameter = require("./app/parameter");
const errorVerify = require("./app/error"); // error verify

function validate(rules, data) {
  return (proto, propertyKey, descriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function validateWrap(ctx, next) {
      // 从获取 query body
      console.log("rules, data", rules, data);
      ctx.verifyParams(rules, data);

      await oldFunc.call(this, ...arguments);
      await next();
    };
  };
}

module.exports = {
  parameter,
  validate,
  errorVerify,
};
