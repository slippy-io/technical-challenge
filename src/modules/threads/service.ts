import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../services/firebase'
import { ThreadUpdate, type Thread, type ThreadCreate } from './schema'

// Reference to the threads collection
const threadCollection = db.collection('threads')

// Utility function to convert a Firestore document to a Thread object
const fromFirestore = (snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
  const data = snapshot.data()

  if (!data) throw new Error('Thread not found')

  return {
    ...data,
    id: snapshot.id,
    createdAt: data.createdAt.toDate(),
  } as Thread
}

/**
 * List all threads
 * @returns An array of threads
 */
export const listThreads = async (): Promise<Thread[]> => {
  // TODO: Fetch the list of threads
  throw new Error('Not implemented')
}

/**
 * Get a single thread by ID
 * @param id The ID of the thread to fetch
 * @returns The thread with the given ID
 */
export const getThread = async (id: Thread['id']): Promise<Thread> => {
  // TODO: Fetch the thread by ID
  throw new Error('Not implemented')
}

/**
 * Create a new thread
 * @param data The thread data to create
 * @returns The newly created thread
 */
export const createThread = async (data: ThreadCreate): Promise<Thread> => {
  // TODO: Create the thread in Firestore and return the newly created thread
  throw new Error('Not implemented')
}

/**
 * Update a thread by ID
 * @param id The ID of the thread to update
 * @param data The thread data to update
 * @returns The updated thread
 */
export const updateThread = async (id: Thread['id'], data: ThreadUpdate): Promise<Thread> => {
  // TODO: Update the thread in Firestore and return the updated thread
  throw new Error('Not implemented')
}

/**
 * Delete a thread by ID
 * @param id The ID of the thread to delete
 * @returns The deleted thread
 */
export const deleteThread = async (id: Thread['id']): Promise<FirebaseFirestore.WriteResult> => {
  // TODO: Delete the thread in Firestore and return the write result
  throw new Error('Not implemented')
}
