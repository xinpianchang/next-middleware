import Router, { Router as NSRouter } from 'router'
import EventEmitter from 'events'
import type { IncomingMessage, Server as HttpServer, ServerResponse } from 'http'
import { AsyncLocalStorage } from 'async_hooks'
import inject from './inject'

const router = Router() as NRouter

const events = new EventEmitter() as RouterEventEmitter
router.events = events
router.storage = new AsyncLocalStorage()

interface RouterEventEmitter extends EventEmitter {
  emit(event: 'init', server: HttpServer): boolean
  on(event: 'init', listener: (server: HttpServer) => any): this
  once(event: 'init', listener: (server: HttpServer) => any): this
  off(event: 'init', listener: (server: HttpServer) => any): this
}

export interface NRouter extends NSRouter.Router {
  events: RouterEventEmitter
  storage: AsyncLocalStorage<HttpContext>
}

export interface HttpContext {
  req: IncomingMessage
  res: ServerResponse
}

setTimeout(inject, 0, router)
export default router
