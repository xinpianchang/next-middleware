import Router, { Router as NSRouter } from 'router'
import NextNodeServer from 'next/dist/server/next-server'
import { IncomingMessage, ServerResponse, Server as HttpServer } from 'http'
import EventEmitter from 'events'

const router = Router() as NRouter

declare module 'next/dist/server/base-server' {
  interface Options {
    httpServer?: HttpServer
  }
}

const originalHandler = NextNodeServer.prototype.getRequestHandler
NextNodeServer.prototype.getRequestHandler = function getRequestHandler(this: NextNodeServer) {
  const handler = originalHandler.call(this)
  return async (req, res, parsedUrl) => {
    if (req instanceof IncomingMessage && res instanceof ServerResponse) {
      // only nodejs runtime can be handled with middleware
      return router(req, res, () => handler(req, res, parsedUrl))
    }
    return handler(req, res, parsedUrl)
  }
}

const originalPrepare = NextNodeServer.prototype.prepare
NextNodeServer.prototype.prepare = function prepare(this: NextNodeServer) {
  const httpServer = this.serverOptions.httpServer
  httpServer && router.events.emit('init', httpServer)
  return originalPrepare.call(this)
}

const events = new EventEmitter() as RouterEventEmitter
router.events = events

interface RouterEventEmitter extends EventEmitter {
  emit(event: 'init', server: HttpServer): boolean
  on(event: 'init', listener: (server: HttpServer) => any): this
  once(event: 'init', listener: (server: HttpServer) => any): this
  off(event: 'init', listener: (server: HttpServer) => any): this
}

interface NRouter extends NSRouter.Router {
  events: RouterEventEmitter
}

export default router
