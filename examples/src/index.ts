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
      no: "date?",
      isshow: {
        type: "boolean?",
        default: true,
      },
      name: "bool",
    })
    public async index(ctx: any) {
      ctx.body = {
        ...ctx.request.query,
        ...ctx.params,
      };
    }
  }

  await myapp.loadFile("../middleware");
  await myapp.binding();
  myapp.listen(3000);
})();
