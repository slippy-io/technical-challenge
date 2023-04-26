/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { CommentCreateSchema, CommentUpdateSchema } from './schema'
import { createComment, deleteComment, getComment, listComments, updateComment } from './service'
import { ZodError } from 'zod'

/**
 * Create a comment for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created comment
 */
export const createCommentHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  try {
    // Validate the request body using CommentCreateSchema
    const commentData = CommentCreateSchema.parse(req.body)

    // Create the comment using the createComment service
    const comment = await createComment(threadId, commentData)

    // Return the created comment in the response
    return res.status(200).json({ success: true, data: comment })
  } catch (error) {
    // If the request body is invalid, return a 400 response with the error
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, error: error.errors })
    }

    // Return a generic 500 error response for other errors
    console.error(error)
    return res.status(500).json({ success: false, error: error })
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
    const comments = await listComments(threadId)
    res.status(200).json({ success: true, data: comments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error })
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

  try {
    // Call the getComment service to fetch the comment by ID
    const comment = await getComment(threadId, commentId)

    // Return the comment in the response
    res.status(200).json({
      success: true,
      comment
    })
  } catch (err) {
    console.error(err)

    // Return an error response if the comment cannot be fetched
    res.status(500).json({
      success: false,
      error: err
    })
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

  try {
    const data = CommentUpdateSchema.parse(req.body)

    const updatedComment = await updateComment(threadId, commentId, data)

    res.status(200).json({
      status: 'success',
      data: updatedComment,
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      status: false,
      error: error
    })
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
  const result = await deleteComment(threadId, commentId)

  res.status(200).json({success:true})
}
catch(err){
  res.status(400).json({success:false, error:"Item not found"})
}

 
}

