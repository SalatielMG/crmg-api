import express from 'express'
import setupRoutes from '@/application/config/routes'
import setupMiddlewares from '@/application/config/middlewares'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
// app.set('views', './emails');
app.set('view engine', 'pug');

export default app
