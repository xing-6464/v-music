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

  app.listen(5173)
}

createViteServer()

// import express from 'express'
// import { createServer } from 'vite'
// import registerRouter from './router'

// const parentServer = express()
// registerRouter(parentServer)

// const vite = await createServer({
//   server: {
//     middlewareMode: true,
//     https: parentServer,
//   },
//   proxy: {
//     '/api': {
//       target: 'http://localhost:5175',
//       changeOrigin: true,
//     },
//   },
// })
// vite.middlewares.handle()
