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

  const {  title, description, username } = req.body;

  try {
    // TODO: Validate the request body using threadCreateSchema
    const validatedData = threadCreateSchema.parse(req.body)
  } catch (error) {
    // TODO: If the request body is invalid, return a 400 response with the error
    const response = {
      error: error,
      success: "false"
    };
    return res.status(400).json(response);
  }

  // TODO: Create the thread using the createThread service
  createThread(req.body)
    .then((thread) => {
      // TODO: Return the created thread in the response
      const response = {
        data: thread,
        success: "true"
      }
      return res.status(201).send(response);
    })
    .catch((error) => {
      const response = {
        error,
        success: "false"
      }
      return res.status(500).json(response);
    });
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
    const response = {
      data: threads,
      success: "true"
    }
    return res.send(response)

  } catch (error) {
    const response = {
      error: error,
      success: "false"
    };
    return res.status(500).json(response);
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
    // TODO: Fetch the thread using the getThread service
    const thread = await getThread(threadId)
    // TODO: Return the thread in the response
    const response = {
      data: thread,
      success: "true"
    }
    return res.send(response)
  } catch (error) {
    const response = {
      error: error,
      success: "false"
    };
    return res.status(500).json(response);
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
    // TODO: Validate the request body using threadUpdateSchema
    threadUpdateSchema.parse(req.body)
  } catch (error) {
    // TODO: If the request body is invalid, return a 400 response with the error
    const response = {
      error,
      success: "false"
    }
    return res.status(400).send(response)
  }

  try {
    // TODO: Update the thread using the updateThread service
    const updatedThread = await updateThread(threadId, req.body)

    // TODO: Return the updated thread in the response
    const response = {
      data: updatedThread,
      success: "true"
    }
    return res.send(response)
  } catch (error) {
    const response = {
      error,
      success: "false"
    }
    return res.status(500).send(response)
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
    // TODO: Delete the thread using the deleteThread service
    const deleteStamp =await deleteThread(threadId)

    // TODO: Return a success response
    const response = {
      success: "true",
      data:deleteStamp
    }
    return res.send(response)
  } catch (error) {
    const response = {
      error,
      success: "false"
    }
    return res.status(500).json(response)
  }
}