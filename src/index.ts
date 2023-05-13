import Router, { Router as NSRouter } from 'router'
import EventEmitter from 'events'
import type { IncomingMessage, Server as HttpServer, ServerResponse } from 'http'
import type { Server as HttpsServer } from 'https'
import { AsyncLocalStorage } from 'async_hooks'
import inject from './inject'

const router = Router() as NRouter

const events = new EventEmitter() as RouterEventEmitter
router.events = events
router.storage = new AsyncLocalStorage()

interface RouterEventEmitter extends EventEmitter {
  emit(event: 'init', server: HttpServer): boolean
  on(event: 'init', listener: (server: HttpServer | HttpsServer) => any): this
  once(event: 'init', listener: (server: HttpServer | HttpsServer) => any): this
  off(event: 'init', listener: (server: HttpServer | HttpsServer) => any): this
}

export interface NRouter extends NSRouter.Router {
  events: RouterEventEmitter
  storage: AsyncLocalStorage<HttpContext>
}

export interface HttpContext {
  req: IncomingMessage
  res: ServerResponse
}

inject(router)
export default router
