import { HandleFunction } from 'connect'
import middleware from './middleware'

export default function useNextMiddleware(mw: HandleFunction) {
  middleware.use(mw)
}
