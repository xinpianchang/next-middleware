/// <reference types="node" />
/// <reference path="./router.d.ts" />

import { Router as NSRouter } from 'router';
import type { IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import EventEmitter from 'events';
declare const router: NRouter;
declare const httpContextAsyncLocalStorage: import("async_hooks").AsyncLocalStorage<HttpContext>;

declare module 'next/dist/server/base-server' {
    interface Options {
        httpServer?: HttpServer;
    }
}
interface RouterEventEmitter extends EventEmitter {
    emit(event: 'init', server: HttpServer): boolean;
    on(event: 'init', listener: (server: HttpServer) => any): this;
    once(event: 'init', listener: (server: HttpServer) => any): this;
    off(event: 'init', listener: (server: HttpServer) => any): this;
}
interface NRouter extends NSRouter.Router {
    events: RouterEventEmitter;
    storage: typeof httpContextAsyncLocalStorage;
}
interface HttpContext {
  req: IncomingMessage;
  res: ServerResponse;
}

export = router;
