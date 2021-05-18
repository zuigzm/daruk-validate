module.exports = async function errorVerify(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.code === "INVALID_PARAM") {
      ctx.status = 422;
      ctx.body = {
        message: err.message,
        errors: err.errors,
        params: err.params,
      };
      return;
    }
    throw err;
  }
};
