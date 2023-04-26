import { Request, Response } from 'express'
import { threadCreateSchema, threadUpdateSchema } from './schema'
import { createThread, deleteThread, getThread, listThreads, updateThread } from './service'
import { messaging } from 'firebase-admin'

/**
 * Create a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created thread
 */
export const createThreadHandler = async (req: Request, res: Response) => {
  // throw new Error('Not implemented')
  try {
    // TODO: Validate the request body using threadCreateSchema
    const validateData = threadCreateSchema.parse(req.body)
    // TODO: If the request body is invalid, return a 400 response with the error
    if (!req.body) {
      return res.status(400).json({ success: false, message: 'Invalid request data' })
    }
    // TODO: Create the thread using the createThread service
    const createdSchema = await createThread(validateData)
    // TODO: Return the created thread in the response
    return res.status(200).json({ success: true, data: createdSchema })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: "invalid request data" })
  }
}

/**
 * Fetch the list of threads
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of list of threads
 */
export const listThreadsHandler = async (req: Request, res: Response) => {
  // throw new Error('Not implemented')
  try {
    // TODO: Fetch the list of threads using the listThreads service
    const listThread = await listThreads();
    // TODO: Return the list of threads in the response
    return res.status(200).json({ success: true, message: listThread })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: "error occured" })
  }
}

/**
 * Fetch a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given thread
 */
export const getThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  // throw new Error('Not implemented')
  try {
    // TODO: Fetch the thread using the getThread service
    const getData = await getThread(threadId)
    // TODO: Return the thread in the response
    return res.status(200).json({ success: true, getData });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: true, message: "error occured" })
  }
}

/**
 * Update a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of a given thread
 */
export const updateThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  // throw new Error('Not implemented')
  try {
    // TODO: Validate the request body using threadUpdateSchema
    const validateData = await threadUpdateSchema.parse(req.body)
    // TODO: If the request body is invalid, return a 400 response with the error
    if (!validateData) {
      return res.status(400).json({ success: false, message: "invalid request" })
    }
    // TODO: Update the thread using the updateThread service
    const updateData = await updateThread(threadId, validateData)
    // TODO: Return the updated thread in the response
    return res.status(200).json({ success: true, updateData })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: "error occured" })
  }
}

/**
 * Delete a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Void success object
 */
export const deleteThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  // throw new Error('Not implemented')

  try {
    // TODO: Delete the thread using the deleteThread service
    await deleteThread(threadId)
    // TODO: Return a success response
    return res.status(200).json({ success: true, message: "thread deleted successfully" })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "error occured" })
  }
}
