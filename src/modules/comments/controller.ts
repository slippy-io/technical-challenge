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

  // throw new Error('Not implemented')
  try {
    // TODO: Validate the request body using CommentCreateSchema
    const validateData = CommentCreateSchema.parse(req.body)
    // TODO: If the request body is invalid, return a 400 response with the error
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Invalid request" })
    }
    // TODO: Create the comment using the createComment service
    const commentcreated = await createComment(threadId, validateData)
    // TODO: Return the created comment in the response
    return res.status(200).json({ success: true, data: commentcreated })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: "Invalid request data" })
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

  // throw new Error('Not implemented')
  try {
    // TODO: Fetch the list of comments using the listComments service
    const listComment = await listComments(threadId)
    // TODO: Return the list of comments in the response
    return res.status(200).json({ success: true, message: listComment })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "error occured" })
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

  // throw new Error('Not implemented')
  try {
    // TODO: Fetch the comment by ID using the getComment service
    const getData = await getComment(threadId, commentId)
    // TODO: Return the comment in the response
    return res.status(200).json({ success: true, message: getData });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error occured" })
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

  // throw new Error('Not implemented')
  try {
    // TODO: Validate the request body using CommentUpdateSchema
    const validateData = CommentUpdateSchema.parse(req.body)
    // TODO: If the request body is invalid, return a 400 response with the error
    if (!validateData) {
      return res.status(400).json({ success: false, message: "invalid request" })
    }
    // TODO: Update the comment by ID using the updateComment service
    const updateData = await updateComment(threadId, commentId, validateData)
    // TODO: Return the updated comment in the response
    return res.status(200).json({ success: true, updateData })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "error occured" })
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

  // throw new Error('Not implemented')

  try {

    // TODO: Delete the comment by ID using the deleteComment service

    await deleteComment(threadId, commentId)

    // TODO: Return a void success response

    return res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "error occured" })
  }
}
