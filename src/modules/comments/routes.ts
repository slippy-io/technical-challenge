/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { createCommentHandler, deleteCommentHandler, getCommentHandler, listCommentsHandler, updateCommentHandler } from './controller'

const router = Router({ mergeParams: true })

// Define basic CRUD routes for the comment resource
// eslint-disable-next-line prettier/prettier
router.post('/', createCommentHandler)
router.get('/', listCommentsHandler)
router.get('/:commentId', getCommentHandler)
router.put('/:commentId', updateCommentHandler)
router.delete('/:commentId', deleteCommentHandler)

export default router
