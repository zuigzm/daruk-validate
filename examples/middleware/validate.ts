import { Daruk, defineMiddleware, MiddlewareClass } from "daruk";
import { parameter } from "../../index";

@defineMiddleware("koa-ejs")
class DarukValidate implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    parameter(daruk.app);
  }
}
