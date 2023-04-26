/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../services/firebase'
import { Thread } from '../threads/schema'
import { CommentUpdate, type Comment, type CommentCreate } from './schema'

// Utility function to get the comments collection for a given thread
const commentCollection = (threadId: Thread['id']) => db.collection(`threads/${threadId}/comments`)

// Utility function to convert a Firestore document to a Comment object
const fromFirestore = (snapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
  const data = snapshot.data()

  if (!data) throw new Error('Comment not found')
  const createdAt = typeof data.createdAt === 'string' ? new Date(Date.parse(data.createdAt)) : data.createdAt.toDate()
  
  return {
    ...data,
    id: snapshot.id,
    createdAt
  } as Comment
}


/**
 * List all comments for a given thread
 * @param threadId The ID of the thread to fetch comments for
 * @returns An array of comments for the given thread
 */
export const listComments = async (threadId: Thread['id']): Promise<Comment[]> => {
  
    const AllComments = await commentCollection(threadId).get();
    const comments: Comment[] = [];
    AllComments.forEach((doc) => {
      comments.push(fromFirestore(doc))
    })
    return comments;
  
};
/**
 * Get a single comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to fetch
 * @returns The comment with the given ID
 */
export const getComment = async (threadId: Thread['id'], id: Comment['id']): Promise<Comment> => {
  const singleThread = await commentCollection(threadId).doc(id).get()
  
  return fromFirestore(singleThread)
}

/**
 * Create a new comment
 * @param threadId The ID of the thread to create the comment for
 * @param data The comment data to create
 * @returns The newly created comment
 */
export const createComment = async (threadId: Thread['id'], data: CommentCreate): Promise<Comment> => {
  const Createcomment= commentCollection(threadId).doc()
  // const createdAt = FieldValue.serverTimestamp().toString()
  console.log(FieldValue.serverTimestamp());
  const createdAt = new Date()
  const comment: Comment = {
    id: Createcomment.id,
    threadId,
    ...data,
    createdAt:createdAt,
  }
  await Createcomment.set(comment);
  return comment
}

/**
 * Update a comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to update
 * @param data The comment data to update
 * @returns The updated comment
 */
export const updateComment = async (threadId: Thread['id'], id: Comment['id'], data: CommentUpdate): Promise<Comment> => {
  const commentRef = commentCollection(threadId).doc(id)

  // Update the comment document with the new data
  await commentRef.update(data)

  // Get the updated comment document from Firestore
  const updatedCommentDoc = await commentRef.get()

  // Convert the Firestore document to a Comment object and return it
  const updatedComment = fromFirestore(updatedCommentDoc)

  return updatedComment
}

/**
 * Delete a comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to delete
 * @returns The deleted comment
 */
export const deleteComment = async (threadId: Thread['id'], id: Comment['id']): Promise<FirebaseFirestore.WriteResult> => {
  try {
    const commentRef = commentCollection(threadId).doc(id);
    const result = await commentRef.delete();
    return result;
  } catch (error) {
    throw new Error(`Failed to delete comment with ID ${id} in thread with ID ${threadId}: ${error}`);
  }
}
