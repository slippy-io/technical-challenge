import { Request, Response } from 'express'
import { CommentCreateSchema, CommentUpdateSchema } from './schema'
import { createComment, deleteComment, getComment, listComments, updateComment } from './service'

/**
 * Create a comment for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created comment
 */
export const createCommentHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  throw new Error('Not implemented')

  // TODO: Validate the request body using CommentCreateSchema

  // TODO: If the request body is invalid, return a 400 response with the error

  // TODO: Create the comment using the createComment service

  // TODO: Return the created comment in the response
}

/**
 * Fetch the list of comments for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of list of comments for a thread
 */
export const listCommentsHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  throw new Error('Not implemented')

  // TODO: Fetch the list of comments using the listComments service

  // TODO: Return the list of comments in the response
}

/**
 * Fetch a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given comment in a thread
 */
export const getCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params

  throw new Error('Not implemented')

  // TODO: Fetch the comment by ID using the getComment service

  // TODO: Return the comment in the response
}

/**
 * Update a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given comment in a thread
 */
export const updateCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params

  throw new Error('Not implemented')

  // TODO: Validate the request body using CommentUpdateSchema

  // TODO: If the request body is invalid, return a 400 response with the error

  // TODO: Update the comment by ID using the updateComment service

  // TODO: Return the updated comment in the response
}

/**
 * Delete a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Void success object
 */
export const deleteCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params

  throw new Error('Not implemented')

  // TODO: Delete the comment by ID using the deleteComment service

  // TODO: Return a void success response
}
