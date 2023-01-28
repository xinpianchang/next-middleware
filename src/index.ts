import Router, { Router as NSRouter } from 'router'
import EventEmitter from 'events'
import type { Server as HttpServer } from 'http'
import inject from './inject'

const router = Router() as NRouter

const events = new EventEmitter() as RouterEventEmitter
router.events = events

interface RouterEventEmitter extends EventEmitter {
  emit(event: 'init', server: HttpServer): boolean
  on(event: 'init', listener: (server: HttpServer) => any): this
  once(event: 'init', listener: (server: HttpServer) => any): this
  off(event: 'init', listener: (server: HttpServer) => any): this
}

export interface NRouter extends NSRouter.Router {
  events: RouterEventEmitter
}

setTimeout(inject, 0, router)

export default router
