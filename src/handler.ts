import { Request, Response } from "express";

export interface Handler
{
  handle(req: Request, res: Response): void;
}

export function Inject(className: string)
{
  return (clazz: Handler, name: string) =>
  {
    const obj = clazz as any;
    if(!obj._inject) { obj._inject = {  }; }
    obj._inject[name] = className;
  };
}
