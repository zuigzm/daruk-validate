import koa = require("koa");
import parameter = require("koa-parameter");

export { parameter };

export function validate(
  rules: {
    [key: string]: string;
  },
  params?: any
) {
  return (
    proto: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function validateWrap(
      ctx: koa.Context,
      next: Function
    ) {
      ctx.verifyParams(rules, params);

      await oldFunc.call(this, ...arguments);
      await next();
    };
  };
}
