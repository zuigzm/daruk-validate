import Koa = require("koa");

export type ValidateOptionsType = {
  translate?: Function;
  validateRoot?: boolean;
  convert?: boolean;
  widelyUndefined?: any;
};

export function parameter(app: Koa, options?: ValidateOptionsType): void;

interface RulesType {
  [key: string]:
    | string
    | {
        type: string;
        required?: boolean;
        convertType?:
          | "int"
          | "number"
          | "string"
          | "boolean"
          | ((value: any) => any);
        default?: any; // The default value of property, once the property is allowed non-required and missed, parameter will use this as the default value. This may change the original input params
        widelyUndefined?: any; // override options.widelyUndefined
        min?: number;
        max?: number;
        allowEmpty?: boolean; //allow empty string, default to false. If rule.required set to false, allowEmpty will be set to true by default.
        format?: RegExp; // A RegExp to check string's format.
        trim?: boolean; // Trim the string before check, default is false
        compare?: boolean;
      };
}

export function validate(
  rules: RulesType,
  params?: any
): (proto: Object, propertyKey: string) => void;
export function errorVerify(ctx: Koa.Context, next: Koa.Next): Promise<void>;
