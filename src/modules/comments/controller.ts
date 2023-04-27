import { Request, Response } from 'express'
import { CommentCreateSchema, CommentUpdateSchema } from './schema'
import { ZodError } from 'zod'
import { createComment, deleteComment, getComment, listComments, updateComment } from './service'
import { messaging } from 'firebase-admin'

/**
 * Create a comment for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created comment
 */
export const createCommentHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  try{
    // TODO: Validate the request body using CommentCreateSchema
    const commentData = CommentCreateSchema.parse(req.body)

    // TODO: Create the comment using the createComment service
    const comment = await createComment(threadId, commentData)

    // TODO: Return the created comment in the response
    res.status(201).json({ success: true, data: comment })

    // TODO: If the request body is invalid, return a 400 response with the error
  } catch (error: unknown){
    if (error instanceof ZodError) {
      res.status(400).json({ success: false, error: error.errors })
    } else {
      // Otherwise, return a 500 response with the error
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }
}


/**
 * Fetch the list of comments for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of list of comments for a thread
 */
export const listCommentsHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  try {
    // TODO: Fetch the list of comments using the listComments service
    const comments = await listComments(threadId)

    // TODO: Return the list of comments in the response
    res.json({ success: true, data: comments })
  } catch (error: unknown){
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

/**
 * Fetch a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given comment in a thread
 */
export const getCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params

  try{
    // TODO: Fetch the comment by ID using the getComment service
    const comment = await getComment(threadId, commentId)

    // TODO: Return the comment in the response
    res.json({ success: true, data: comment })
  } catch (error: unknown){
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

/**
 * Update a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given comment in a thread
 */
export const updateCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params

  try{
    // TODO: Validate the request body using CommentUpdateSchema
    const commentData = CommentUpdateSchema.parse(req.body)

    // TODO: Update the comment by ID using the updateComment service
    const comment = await updateComment(threadId, commentId, commentData)

    // TODO: Return the updated comment in the response
    res.json({ success: true, data: comment })

    // TODO: If the request body is invalid, return a 400 response with the error
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // If the request body is invalid, return a 400 response with the error
      res.status(400).json({ success: false, error: error.errors })
    } else {
      // Otherwise, return a 500 response with the error
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }
}

/**
 * Delete a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Void success object
 */
export const deleteCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params

  try{
    // TODO: Delete the comment by ID using the deleteComment service
    await deleteComment(threadId, commentId)

    // TODO: Return a void success response
    res.status(204).send()
  } catch (error: unknown){
    res.status(500).json({ success: false, error: 'Internal server Error'})
  }
}
