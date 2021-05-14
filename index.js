function validate(rules, params) {
    return function (proto, propertyKey, descriptor) {
        var oldFunc = descriptor.value;
        descriptor.value = async;
        function validateWrap(ctx, next) {
            ctx.verifyParams(rules, params);
            await;
            oldFunc.call.apply(oldFunc, [this].concat(arguments));
            await;
            next();
        }
        ;
    };
}
exports.validate = validate;
