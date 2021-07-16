# usage
```javascript
const useNextMiddleware = require('@newstudios/next-middleware')

useNextMiddleware((req, res, next) => {
  // req and res process
  // ....

  // continue next middleware
  next()
})
```
