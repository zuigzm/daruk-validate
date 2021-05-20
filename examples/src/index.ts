import { DarukServer, controller, get } from "daruk";
import { validate } from "../../";

(async () => {
  const myapp = DarukServer({
    middlewareOrder: ["daruk-validate"],
  });

  @controller()
  class Index {
    @get("/:name")
    @validate({
      ok: {
        type: "int?",
        default: 1000,
      },
      no: 'date?',
      name: 'int'
    })
    public async index(ctx: any) {
      ctx.body = `hello world ${ctx.request.query.ok}`;
    }
  }

  await myapp.loadFile("../middleware");
  await myapp.binding();
  myapp.listen(3000);
})();
