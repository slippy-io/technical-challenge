import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../services/firebase'
import { ThreadUpdate, type Thread, type ThreadCreate } from './schema'
import * as admin from 'firebase-admin';

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
  // throw new Error('Not implemented')
  const collectionRef = await admin.firestore().collection('threads')
  const snapshot = await collectionRef.get()
  const threads: Thread[] = [];

  snapshot.forEach((doc) => {
    const thread = fromFirestore(doc)
    threads.push(thread);
  })


  //return the data
  return threads
}

/**
 * Get a single thread by ID
 * @param id The ID of the thread to fetch
 * @returns The thread with the given ID
 */
export const getThread = async (id: Thread['id']): Promise<Thread> => {
  // TODO: Fetch the thread by ID
  // throw new Error('Not implemented')
  const docRef = await admin.firestore().collection('threads').doc(id)
  const doc = await docRef.get();

  if (!doc.exists) {
    throw Error('Thread not found!')
  }

  const data = doc.data();

  if (!data) {
    throw Error('thread data not found!')
  }

  const thread = await fromFirestore(doc);

  return thread;
}

/**
 * Create a new thread
 * @param data The thread data to create
 * @returns The newly created thread
 */
export const createThread = async (data: ThreadCreate): Promise<Thread> => {
  // TODO: Create the thread in Firestore and return the newly created thread
  // throw new Error('Not implemented')
  const threadData = data

  const docRef = await admin.firestore().collection('threads').doc();

  const thread: Thread = {
    id: docRef.id,
    name: threadData.name,
    description: threadData.description,
    createdAt: new Date(),
    createdBy: threadData.createdBy
  }

  await docRef.set(thread)

  return thread;
}

/**
 * Update a thread by ID
 * @param id The ID of the thread to update
 * @param data The thread data to update
 * @returns The updated thread
 */
export const updateThread = async (id: Thread['id'], data: ThreadUpdate): Promise<Thread> => {
  // TODO: Update the thread in Firestore and return the updated thread
  // throw new Error('Not implemented')

  const updateData = await admin.firestore().collection('threads').doc(id)

  await updateData.update(data)

  const updateddata = await updateData.get()

  const updData = fromFirestore(updateddata)

  return updData

}

/**
 * Delete a thread by ID
 * @param id The ID of the thread to delete
 * @returns The deleted thread
 */
export const deleteThread = async (id: Thread['id']): Promise<FirebaseFirestore.WriteResult> => {
  // TODO: Delete the thread in Firestore and return the write result
  // throw new Error('Not implemented')
  const threadId = id;

  const deleteData = await admin.firestore().collection('threads').doc(threadId).delete()

  return deleteData
}
