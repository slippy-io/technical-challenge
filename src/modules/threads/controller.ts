import { Request, Response } from 'express'
import { threadCreateSchema, threadUpdateSchema } from './schema'
import { createThread, deleteThread, getThread, listThreads, updateThread } from './service'

/**
 * Create a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created thread
 */
export const createThreadHandler = async (req: Request, res: Response) => {
  throw new Error('Not implemented')

  // TODO: Validate the request body using threadCreateSchema

  // TODO: If the request body is invalid, return a 400 response with the error

  // TODO: Create the thread using the createThread service

  // TODO: Return the created thread in the response
}

/**
 * Fetch the list of threads
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of list of threads
 */
export const listThreadsHandler = async (req: Request, res: Response) => {
  throw new Error('Not implemented')

  // TODO: Fetch the list of threads using the listThreads service

  // TODO: Return the list of threads in the response
}

/**
 * Fetch a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given thread
 */
export const getThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  throw new Error('Not implemented')

  // TODO: Fetch the thread using the getThread service

  // TODO: Return the thread in the response
}

/**
 * Update a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given thread
 */
export const updateThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  throw new Error('Not implemented')

  // TODO: Validate the request body using threadUpdateSchema

  // TODO: If the request body is invalid, return a 400 response with the error

  // TODO: Update the thread using the updateThread service

  // TODO: Return the updated thread in the response
}

/**
 * Delete a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Void success object
 */
export const deleteThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  throw new Error('Not implemented')

  // TODO: Delete the thread using the deleteThread service

  // TODO: Return a success response
}
