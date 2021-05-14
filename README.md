# daruk-validate

> parameter validate middleware for daruk, powered by koa-parameter.

## Installation

```bash
$ npm install daruk-validate --save
```

## Usage

```js
import { DarukServer, controller, get } from "daruk";
import { validate } from "daruk-validate";

(async () => {
  const myapp = DarukServer({
    middlewareOrder: ["daruk-validate"],
  });

  @controller()
  class Index {
    @get("/")
    @validate({
      name: {
        type: 'string',
        required: true,
      },
    })
    public async index(ctx: any) {
      ctx.body = "hello world";
    }
  }

  await myapp.loadFile("../middleware");
  await myapp.binding();
  myapp.listen(3000);
})();

```

Checkout [parameter](https://github.com/node-modules/parameter) to get all the rules.

## Translate

You can override the translate method of parameter to implement I18n, by passing a function like this :

```js
import { Daruk, defineMiddleware, MiddlewareClass } from "daruk";
import { parameter } from "daruk-validate";

@defineMiddleware("daruk-validate")
class DarukValidate implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    parameter(daruk.app as any, function() {
      // Same example with node-parameter
      var args = Array.prototype.slice.call(arguments);
      // Assume there have I18n.t method for convert language.
      return I18n.t.apply(I18n, args);
    }});
  }
}
```

## [Example](examples/index.js)

### License

MIT
