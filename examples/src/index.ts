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
      date: {
        type: "date",
        message: {
          required: "时间不能为空",
        },
      },
      name: {
        type: "int",
        max: 50,
        message: {
          max: "请不要输入大于50的值",
          required: "请输入正确的name格式",
        },
      },
    })
    public async index(ctx: any) {
      ctx.body = `hello world ${ctx.request.query.ok}`;
    }
  }

  await myapp.loadFile("../middleware");
  await myapp.binding();
  myapp.listen(3000);
})();
