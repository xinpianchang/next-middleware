import Router from 'router'
import Server from 'next/dist/server/next-server'
import { IncomingMessage, ServerResponse } from 'http'

const router = Router()

const originalHandler = Server.prototype.getRequestHandler
Server.prototype.getRequestHandler = function getRequestHandler() {
  const handler = originalHandler.call(this)
  return async (req, res, parsedUrl) => {
    if (req instanceof IncomingMessage && res instanceof ServerResponse) {
      return router(req, res, () => handler(req, res, parsedUrl))
    }
    return handler(req, res, parsedUrl)
  }
}

export default router
