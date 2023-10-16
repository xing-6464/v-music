const express = require('express')
// const { createServer } = require('vite')
const registerRouter = require('./router')

async function createViteServer() {
  const app = express()
  // const vite = await createServer({
  //   server: { middlewareMode: true },
  //   appType: 'custom',
  // })
  registerRouter(app)

  // app.use(vite.middlewares)

  app.listen(5174)
}

createViteServer()
