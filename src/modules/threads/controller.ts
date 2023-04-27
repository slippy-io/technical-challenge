import { Request, Response } from 'express'
import { threadCreateSchema, threadUpdateSchema } from './schema'
import { createThread, deleteThread, getThread, listThreads, updateThread } from './service'
import { ZodError, unknown } from 'zod'
import { threadId } from 'worker_threads'
import { json } from 'stream/consumers'
import { error } from 'console'

/**
 * Create a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created thread
 */
export const createThreadHandler = async (req: Request, res: Response) => {

  try{
    // TODO: Validate the request body using threadCreateSchema
    const threadData = threadCreateSchema.parse(req.body)

    // TODO: Create the thread using the createThread service
    const thread = await createThread(threadData)

    // TODO: Return the created thread in the response
    res.status(201).json({ success: true, data: thread})

    // TODO: If the request body is invalid, return a 400 response with the error
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ success: false, error: error.errors })
    } else {
      // Otherwise, return a 500 response with the error
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  }

}

/**
 * Fetch the list of threads
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of list of threads
 */
export const listThreadsHandler = async (req: Request, res: Response) => {

  try{

    // TODO: Fetch the list of threads using the listThreads service
    const threads = await listThreads()

    // TODO: Return the list of threads in the response
    res.json({ success: true, data: threads })
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: 'Insternal Server Error' })
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

  try{

    // TODO: Fetch the thread using the getThread service
    const thread = await getThread(threadId)

    // TODO: Return the thread in the response
    res.json({ success: true, data: thread })
  } catch (error: unknown) {
    res.status(500).json({ success: false, error: 'Internal Server Error' })
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

  try{

    // TODO: Validate the request body using threadUpdateSchema
    const threadData = threadUpdateSchema.parse(req.body)

    // TODO: Update the thread using the updateThread service
    const thread = await updateThread(threadId, threadData)

    // TODO: Return the updated thread in the response
    res.json({ success: true, data: thread })

    // TODO: If the request body is invalid, return a 400 response with the error
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      // Handle other types of errors
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
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

  try{

    // TODO: Delete the thread using the deleteThread service
    await deleteThread(threadId)

    // TODO: Return a success response
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}
