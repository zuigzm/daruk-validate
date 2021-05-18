import { DarukServer, controller, get } from "daruk";
import { validate } from "../../";

(async () => {
  const myapp = DarukServer({
    middlewareOrder: ["daruk-validate"],
  });

  @controller()
  class Index {
    @get("/")
    @validate({
      name: {
        type: "string?",
        default: 1000,
      },
    })
    public async index(ctx: any) {
      ctx.body = `hello world ${ctx.request.query.name}`;
    }
  }

  await myapp.loadFile("../middleware");
  await myapp.binding();
  myapp.listen(3000);
})();
