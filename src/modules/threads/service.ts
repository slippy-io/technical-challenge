/* eslint-disable prettier/prettier */
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../services/firebase'
import { ThreadUpdate, type Thread, type ThreadCreate, threadSchema } from './schema'
// Reference to the threads collection
const threadCollection = db.collection('threads')

// Utility function to convert a Firestore document to a Thread object
const fromFirestore = (snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
  const data = snapshot.data()

  if (!data) throw new Error('Thread not found')
  const createdAt = typeof data.createdAt === 'string' ? new Date(Date.parse(data.createdAt)) : data.createdAt.toDate()

  return {
    ...data,
    id: snapshot.id,
    createdAt
  } as Thread
}

/**
 * List all threads
 * @returns An array of threads
 */
export const listThreads = async (): Promise<Thread[]> => {
  const threadsSnapshot = await threadCollection.get()

  const threads: Thread[] = []
  threadsSnapshot.forEach((doc) => {
    threads.push(fromFirestore(doc))
  })

  return threads
}

/**
 * Get a single thread by ID
 * @param id The ID of the thread to fetch
 * @returns The thread with the given ID
 */
export const getThread = async (id: Thread['id']): Promise<Thread> => {
  const singleThread = await threadCollection.doc(id).get()
  
  return fromFirestore(singleThread)
}

/**
 * Create a new thread
 * @param data The thread data to create
 * @returns The newly created thread
 */
export const createThread = async (data: ThreadCreate): Promise<Thread> => {
  const CreateThread = threadCollection.doc()

  
 
  const newThread: Thread = {
    id: CreateThread.id,
    ...data,  
    createdAt:new Date(),
  }

  await CreateThread.set(newThread)

  return newThread
}

/**
 * Update a thread by ID
 * @param id The ID of the thread to update
 * @param data The thread data to update
 * @returns The updated thread
 */
export const updateThread = async (id: Thread['id'], data: ThreadUpdate): Promise<Thread> => {
  const threadRef = db.collection('threads').doc(id)

  // Update the thread document with the new data
  await threadRef.update(data)

  // Get the updated thread document from Firestore
  const updatedThreadDoc = await threadRef.get()

  // Convert the Firestore document to a Thread object and return it
  const updatedThread = fromFirestore(updatedThreadDoc)

  return updatedThread
}

/**
 * Delete a thread by ID
 * @param id The ID of the thread to delete
 * @returns The deleted thread
 */
export const deleteThread = async (id: Thread['id']): Promise<FirebaseFirestore.WriteResult> => {
  // Get a reference to the thread document
  const thread = threadCollection.doc(id)

  // Delete the thread document
  return thread.delete()
}
