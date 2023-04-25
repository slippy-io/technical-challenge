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

  return {
    ...data,
    id: snapshot.id,
    createdAt: data.createdAt.toDate(),
  } as Comment
}

/**
 * List all comments for a given thread
 * @param threadId The ID of the thread to fetch comments for
 * @returns An array of comments for the given thread
 */
export const listComments = async (threadId: Thread['id']): Promise<Comment[]> => {
  // TODO: Fetch the list of comments for the given thread
  throw new Error('Not implemented')
}

/**
 * Get a single comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to fetch
 * @returns The comment with the given ID
 */
export const getComment = async (threadId: Thread['id'], id: Comment['id']): Promise<Comment> => {
  // TODO: Fetch the comment by ID
  throw new Error('Not implemented')
}

/**
 * Create a new comment
 * @param threadId The ID of the thread to create the comment for
 * @param data The comment data to create
 * @returns The newly created comment
 */
export const createComment = async (threadId: Thread['id'], data: CommentCreate): Promise<Comment> => {
  // TODO: Create the comment in Firestore and return the newly created comment
  throw new Error('Not implemented')
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
  throw new Error('Not implemented')
}

/**
 * Delete a comment by ID
 * @param threadId The ID of the thread the comment belongs to
 * @param id The ID of the comment to delete
 * @returns The deleted comment
 */
export const deleteComment = async (threadId: Thread['id'], id: Comment['id']): Promise<FirebaseFirestore.WriteResult> => {
  // TODO: Delete the comment from Firestore and return the result
  throw new Error('Not implemented')
}
