import express from 'express'

import { router } from './routes'

// Initialize express app with JSON body parser and router
export const app = express().use(express.json()).use(router)
