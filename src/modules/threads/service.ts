import { db } from '../../services/firebase'
import { ThreadUpdate, type Thread, type ThreadCreate } from './schema'
import moment from 'moment';


// Reference to the threads collection
const collectionRef = db.collection('Thread')

//timeline
const time = Date.now();
const timeStamp = moment(time).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ ');

// Utility function to convert a Firestore document to a Thread object
const fromFirestore = (snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
  const data = snapshot.data()
  if (!data) throw new Error('Thread not found')
  return {
    ...data,
    id: snapshot.id,
    title: data.title,
    description: data.description,
    username: data.username,
    createdAt: data.createdAt,
    changedAt: data.changedAt
  } as Thread
}

/**
 * Create a new thread
 * @param data The thread data to create
 * @returns The newly created thread
 */
export const createThread = async (data: ThreadCreate): Promise<Thread> => {
  // TODO: Create the thread in Firestore and return the newly created thread
  const newDocRef = await collectionRef.add({
    title: data.title,
    description: data.description,
    username: data.username,
    createdAt: timeStamp
  })
  const newDocSnapshot = await newDocRef.get()
  return {
    id: newDocSnapshot.id,
    ...newDocSnapshot.data()
  } as Thread
}

/**
 * List all threads
 * @returns An array of threads
 */
export const listThreads = async (): Promise<Thread[]> => {
  // TODO: Fetch the list of threads
  const snapshot = await collectionRef.get();
  const threads = snapshot.docs.map(doc => fromFirestore(doc)
  );
  return threads;
}

/**
 * Get a single thread by ID
 * @param id The ID of the thread to fetch
 * @returns The thread with the given ID
 */
export const getThread = async (id: Thread['id']): Promise<Thread | string> => {
  // TODO: Fetch the thread by ID
  const docRef = collectionRef.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return `Thread with ID ${id} not found`;
  } else {
    const data = doc.data();
    return { ...data, id } as Thread;
  }
}

/**
 * Update a thread by ID
 * @param id The ID of the thread to update
 * @param data The thread data to update
 * @returns The updated thread
 */
export const updateThread = async (id: Thread['id'], data: ThreadUpdate): Promise<Thread> => {
  // TODO: Update the thread in Firestore and return the updated thread
  const newData = { ...data,changedAt: timeStamp };
  const threadRef = collectionRef.doc(id);
  await threadRef.update(newData);
  const updatedSnapshot = await threadRef.get();
  const updatedThread = { id: updatedSnapshot.id, ...updatedSnapshot.data() } as Thread;
  return updatedThread;
}

/**
 * Delete a thread by ID
 * @param id The ID of the thread to delete
 * @returns The deleted thread
 */
export const deleteThread = async (id: Thread['id']): Promise<FirebaseFirestore.WriteResult> => {
  // TODO: Delete the thread in Firestore and return the write result
  const threadRef = collectionRef.doc(id);
  const result = await threadRef.delete();
  return result;
}
