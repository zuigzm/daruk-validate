import Koa = require('koa')

export function parameter(app: Koa, translate?: Function): void

interface RulesType {
  [key:string]: string | {
    type: string;
    required?: boolean;
    convertType?: 'int' | 'number'|'string'| 'boolean';
    default?: 'string'
    widelyUndefined?: any; // override options.widelyUndefined
  };
}

export function validate(rules: RulesType, params?: any): (proto: Object, propertyKey: string) => void