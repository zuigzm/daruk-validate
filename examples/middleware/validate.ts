import { Daruk, defineMiddleware, MiddlewareClass } from "daruk";
import { parameter } from "../../";

@defineMiddleware("daruk-validate")
class DarukValidate implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return parameter(daruk.app as any);
  }
}
