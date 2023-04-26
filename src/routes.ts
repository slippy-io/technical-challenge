import { Router } from 'express'

import threadRoutes from './modules/threads/routes'

export const router = Router()

  // Health Check
  .get('/', (req, res) => {
    res.json({
      status: 'ok',
      version: process.env.npm_package_version,
    })
  })


  // Thread Routes
  .use('/threads', threadRoutes)
