/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { threadCreateSchema, threadUpdateSchema } from './schema'
import { createThread, deleteThread, getThread, listThreads, updateThread } from './service'
import { ZodError } from 'zod'

/**
 * Create a thread
 * @param req Request Object
 * @param res Response Object
 * @returns Success object of created thread
 */
export const createThreadHandler = async (req: Request, res: Response) => {
  try {
    const threadData = threadCreateSchema.parse(req.body)

    // Create the thread in Firestore
    const thread = await createThread(threadData)

    // Return the created thread
    res.status(200).json({
      success: true,
      data: thread,
    })
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: error.errors,
      })
    } else {
      res.status(500).json({
        success: false,
        error:error,
      })
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
  try {
    // TODO: Fetch the list of threads using the listThreads service
    const threads = await listThreads()

    // TODO: Return the list of threads in the response
    res.json({ success:true, data:threads })
  } catch (error) {
    res.status(500).json({success:false ,error: "Unable to Get Data" })
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

  try {
    // Fetch the thread using the getThread service
    const thread = await getThread(threadId)

    // Return the thread in the response
    return res.status(200).json({ success: true, data: thread })
  } catch (error) {
    // Handle errors
    console.error(error)
    return res.status(500).json({ success: false, error: 'Internal server error' })
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

  try {
    const data = threadUpdateSchema.parse(req.body)

    const updatedThread= await updateThread(threadId, data)

    res.status(200).json({
      status: 'success',
      data: updatedThread,
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
 * Delete a thread by ID
 * @param req Request Object
 * @param res Response Object
 * @returns Void success object
 */
export const deleteThreadHandler = async (req: Request, res: Response) => {
  const { threadId } = req.params

  try {
    // Delete the thread using the deleteThread service
    await deleteThread(threadId)
    // Return a success response
    res.status(200).json({ success: true })
  } catch (error) {
    // If an error occurs, return a 500 response with the error message
    res.status(500).json({ error: error })
  }
}
