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
