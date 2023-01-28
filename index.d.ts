/// <reference types="node" />
/// <reference path="./router.d.ts" />

import { Router as NSRouter } from 'router';
import { Server as HttpServer } from 'http';
import EventEmitter from 'events';
declare const router: NRouter;
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
}
export = router;
