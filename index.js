const parameter = require("koa-parameter");

 function validate(
  rules,
  data
) {
  return (
    proto,
    propertyKey,
    descriptor
  ) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function validateWrap(
      ctx,
      next
    ) {
      // 从获取 query body
      ctx.verifyParams(rules, data);

      await oldFunc.call(this, ...arguments);
      await next();
    };
  };
}

module.exports = {
  parameter,
  validate
}