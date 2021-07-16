# usage
```javascript
const router = require('@newstudios/next-middleware')

router.use((req, res, next) => {
  // req and res process
  // ....

  // continue next middleware
  next()
})
```
