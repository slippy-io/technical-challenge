import { Request, Response } from 'express'
import { CommentCreateSchema, CommentUpdateSchema } from './schema'
import { createComment, deleteComment, getComment, listComments, updateComment } from './service'
import { db } from '../../services/firebase';
/**
 * Create a comment for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created comment
 */
export const createCommentHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  const { message, username } = req.body;

  try {
    // TODO: Validate the request body using CommentCreateSchema

    CommentCreateSchema.parse(req.body)

  } catch (error) {
    // TODO: If the request body is invalid, return a 400 response with the error

    return res.status(400).json({ success: false, error });
  }

  // TODO: Create the comment using the createComment service


  createComment(threadId, req.body)

    .then((comment) => {
      // TODO: Return the created comment in the response
      return res.status(200).json({
        success: true,
        data: comment
      });
    })

    .catch((error) => {
      return res.status(500).json({
        success: false,
        error
      });
    });


}


/**
 * Fetch the list of comments for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of list of comments for a thread
 */
export const listCommentsHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params




  // TODO: Fetch the list of comments using the listComments service

  const comments = await listComments(threadId)
  // TODO: Return the list of comments in the response

  return res.status(200).json({
    success: true,
    data: comments
  });
}

/**
 * Fetch a comment by ID for a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given comment in a thread
 */
export const getCommentHandler = async (req: Request, res: Response) => {
  const { threadId, commentId } = req.params


  // TODO: Fetch the comment by ID using the getComment service
  const threadsById = await getComment(threadId, commentId)

  // TODO: Return the comment in the response
  return res.status(200).json({
    success: true,
    data: threadsById
  });
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

    // TODO: Validate the request body using CommentUpdateSchema
    CommentUpdateSchema.parse(req.body)
  } catch (error) {

    // TODO: If the request body is invalid, return a 400 response with the error
    return res.status(400).json({ success: false, error });

  }
  try {

    // TODO: Update the comment by ID using the updateComment service
    const updatedComment = await updateComment(threadId, commentId, req.body)

    // TODO: Return the updated comment in the response res.send(updatedThread)
    res.status(200).json({ success: true, updatedComment })

  } catch (error) {

    return res.status(400).json({ success: false, error });

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

  try {

    // TODO: Delete the comment by ID using the deleteComment service
    const delete_Comment = await deleteComment(threadId, commentId)

    // TODO: Return a void success response


    return res.status(200).json({
      success: true,
      data:delete_Comment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
}
