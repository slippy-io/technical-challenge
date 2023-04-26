import { db } from '../../services/firebase'
import { Thread } from '../threads/schema'
import { CommentUpdate, type Comment, type CommentCreate } from './schema'
import moment from 'moment';

// Reference to the threads collection
const collectionRef = db.collection('Thread')

//timeline moment middleware
const time = Date.now();
const timeStamp = moment(time).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ ');

// Utility function to get the comments collection for a given thread
const commentCollection = (threadId: Thread['id']) => db.collection(`threads/${threadId}/comments`)

// Utility function to convert a Firestore document to a Comment object
const fromFirestore = (snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
  const data = snapshot.data()

  if (!data) throw new Error('Comment not found')

  return {
    ...data,
    id: snapshot.id,
    
  } as Comment
}

/**
 * List all comments for a given thread
 * @param threadId The ID of the thread to fetch comments for
 * @returns An array of comments for the given thread
 */
export const listComments = async (threadId: Thread['id']): Promise<Comment[]> => {
  // TODO: Fetch the list of comments for the given thread
  const commentsRef = db.collection('Thread').doc(threadId).collection('comments')
  const commentsSnapshot = await commentsRef.get()
  return commentsSnapshot.docs.map(fromFirestore)
}

/**
 * Get a single comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to fetch
 * @returns The comment with the given ID
 */

export const getComment = async (threadId: Thread['id'], id: Comment['id']): Promise<Comment | string> => {

  // TODO: Fetch the comment by ID

  const collectionRef =db.collection('Thread').doc(threadId).collection('comments')
  const docRef = collectionRef.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return `Comment with ID ${id} not found`;
  } else {
    const data = doc.data();
    return { ...data, id } as Comment;
  }
}


/**
 * Create a new comment
 * @param threadId The ID of the thread to create the comment for
 * @param data The comment data to create
 * @returns The newly created comment
 */
export const createComment = async (threadId: Thread['id'], data: CommentCreate): Promise<Comment> => {
  // TODO: Create the comment in Firestore and return the newly created comment
  const newDocRef = await collectionRef.doc(threadId).collection('comments').add({
    message: data.message,
    username: data.username,
    createdAt: timeStamp
  });

  const newDocSnapshot = await newDocRef.get();

  return {
    id: newDocSnapshot.id,
    ...newDocSnapshot.data()
  } as Comment;
}

/**
 * Update a comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to update
 * @param data The comment data to update
 * @returns The updated comment
 */

export const updateComment = async (threadId: Thread['id'], id: Comment['id'], data: CommentUpdate): Promise<Comment> => {
  // TODO: Update the comment in Firestore and return the updated comment
  const newData = { ...data, changedAt: timeStamp };
  const collectionRef =db.collection('Thread').doc(threadId).collection('comments')
  const commentRef = collectionRef.doc(id);
  await commentRef.update(newData);
  const updatedSnapshot = await commentRef.get();
  const updatedComment = { ...updatedSnapshot.data(), id } as Comment;
  return updatedComment;
}

/**
 * Delete a comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to delete
 * @returns The deleted comment
 */
// TODO: Delete the comment from Firestore and return the result

export const deleteComment = async (threadId: Thread['id'], id: Comment['id']): Promise<FirebaseFirestore.WriteResult> => {
  const collectionRef = commentCollection(threadId);
  const commentRef = collectionRef.doc(id);
  const result = await commentRef.delete();
  return result;
}
