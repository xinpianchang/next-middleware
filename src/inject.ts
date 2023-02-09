import { IncomingMessage, ServerResponse } from 'http'
import { createAsyncLocalStorage } from 'next/dist/client/components/async-local-storage'
import type { NRouter } from '.'

export default function inject(router: NRouter) {
  const NextNodeServer = require('next/dist/server/next-server').default
  const originalHandler = NextNodeServer.prototype.getRequestHandler

  // inject asynclocalstorage here, because next has been initialized, thus createAsyncLocalStorage works
  router.storage = createAsyncLocalStorage()

  NextNodeServer.prototype.getRequestHandler = function getRequestHandler() {
    const handler = originalHandler.call(this)
    return async (req: any, res: any, parsedUrl: string) => {
      if (req instanceof IncomingMessage && res instanceof ServerResponse) {
        // only nodejs runtime can be handled with middleware
        return router(req, res, () => {
          const ctx = { req, res }
          return router.storage.run(ctx, () => handler(req, res, parsedUrl))
        })
      }
      return handler(req, res, parsedUrl)
    }
  }

  const originalPrepare = NextNodeServer.prototype.prepare
  NextNodeServer.prototype.prepare = function prepare() {
    const httpServer = this.serverOptions.httpServer
    httpServer && router.events.emit('init', httpServer)
    return originalPrepare.call(this)
  }
}
