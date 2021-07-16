// Type definitions for router

declare module 'router' {
  import { Path } from "path-to-regexp"
  import { NextFunction, NextHandleFunction } from "connect"
  import { IncomingMessage, ServerResponse } from "http"

  export namespace Router {
    export interface RouteType {
      new (path: string): Route
      prototype: Route
    }

    type Method = 'all' | 'head' | 'get' | 'post' | 'delete' | 'put' | 'patch' | 'options'

    export type Route = { readonly path: Path } & Record<Method, (...middlewares: NextHandleFunction[]) => this>

    export interface Options {
      caseSensitive?: boolean
      strict?: boolean
      mergeParams?: <C extends {}, P extends {}>(currentParams: C, parentParams: P) => Record<string | number, any>
    }

    export type ParamCallback<K = string | number> = (
      req: IncomingMessage,
      res: ServerResponse,
      next: NextFunction,
      value: any,
      name: K,
    ) => any

    interface InnerRouter extends NextHandleFunction {
      route(path: Path): Route
      param: <K extends string | number>(name: K, fn: ParamCallback<K>) => this
    }

    export type Router = InnerRouter & Record<'use' | Method, (pathOrMiddleware: Path | NextHandleFunction, ...middlewares: NextHandleFunction[]) => this>

    interface RouterType {
      new (options?: Options): Router
      (options?: Options): Router
      Route: RouteType
      prototype: Router
    }
  }

  export type RouterType = Router.RouterType
  const Router: RouterType
  export default Router
}
