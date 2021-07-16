// Type definitions for router

declare module 'router' {
  import { Path } from "path-to-regexp"
  import { NextFunction, NextHandleFunction, HandleFunction } from "connect"
  import { IncomingMessage, ServerResponse } from "http"

  export namespace Router {
    export interface RouteType {
      new (path: string): Route
      prototype: Route
    }

    export interface Route {
      readonly path: Path;
      all: (...middlewares: HandleFunction[]) => this
      head: (...middlewares: HandleFunction[]) => this
      get: (...middlewares: HandleFunction[]) => this
      post: (...middlewares: HandleFunction[]) => this
      delete: (...middlewares: HandleFunction[]) => this
      put: (...middlewares: HandleFunction[]) => this
      patch: (...middlewares: HandleFunction[]) => this
      options: (...middlewares: HandleFunction[]) => this
    }

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

    export interface Router extends NextHandleFunction {
      route(path: Path): Route
      param: <K extends string | number>(name: K, fn: ParamCallback<K>) => this
      use: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      all: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      head: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      get: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      post: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      delete: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      del: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      put: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      patch: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
      options: (pathOrMiddleware: Path | HandleFunction, ...middlewares: HandleFunction[]) => this
    }

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
