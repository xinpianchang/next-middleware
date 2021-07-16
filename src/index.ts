import Router from 'router'
import Server from 'next/dist/server/next-server'

const router = Router()

const originalHandler = Server.prototype.getRequestHandler
Server.prototype.getRequestHandler = function getRequestHandler() {
  const handler = originalHandler.call(this)
  return async (req, res, parsedUrl) => router(req, res, () => handler(req, res, parsedUrl))
}

export default router
