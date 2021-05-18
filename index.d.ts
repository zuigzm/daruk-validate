import Koa = require('koa')

export function parameter(app: Koa, translate?: Function): void

interface RulesType {
  [key:string]: string | {
    type: string;
    required?: boolean;
    convertType?: 'int' | 'number'|'string'| 'boolean';
    default?: any;  // The default value of property, once the property is allowed non-required and missed, parameter will use this as the default value. This may change the original input params
    widelyUndefined?: any; // override options.widelyUndefined
  };
}

export function validate(rules: RulesType, params?: any): (proto: Object, propertyKey: string) => void