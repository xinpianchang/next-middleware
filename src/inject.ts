import { Hook } from 'require-in-the-middle'
import type { IncomingMessage, RequestListener, Server, ServerResponse } from 'http'
import type { NRouter } from '.'

export default function inject(router: NRouter) {
  const hook = new Hook(['http', 'https'], (exports, _name, _basedir?) => {
    const http = exports as typeof import('http')
    const originalCreateHttpServer = http.createServer

    function createRequestListener(handler: (req: IncomingMessage, res: ServerResponse) => any) {
      return (req: IncomingMessage, res: ServerResponse) => router(req, res, () => router.storage.run({ req, res }, () => handler(req, res)))
    }

    function createServer(listener?: RequestListener): any
    function createServer(opts: any, listener?: RequestListener): any
    function createServer(arg1?: any, arg2?: RequestListener) {
      let server: Server
      if (typeof arg1 === 'function') {
        server = originalCreateHttpServer(createRequestListener(arg1))
      } else if (typeof arg2 === 'function') {
        server = originalCreateHttpServer(arg1, createRequestListener(arg2))
      } else {
        server = originalCreateHttpServer(arg1, createRequestListener((_, r) => r.end()))
      }
      router.events.emit('init', server)
      return server
    }

    return {
      ...http,
      createServer,
    } as any
  })

  return () => hook.unhook()
}
