import { Router } from 'express'
import { createThreadHandler, deleteThreadHandler, getThreadHandler, listThreadsHandler, updateThreadHandler } from './controller'
import commentRoutes from '../comments/routes'

const router = Router()

// Define basic CRUD routes for the thread resource

  
router.post('/', createThreadHandler)
router.get('/', listThreadsHandler)
router.get('/:threadId', getThreadHandler)
router.put('/:threadId', updateThreadHandler)
router.delete('/:threadId', deleteThreadHandler)
router.use('/:threadId/comments', commentRoutes)



export default router
