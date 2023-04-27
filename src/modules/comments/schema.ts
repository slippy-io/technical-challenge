import { z } from 'zod'

// TODO: Add the fields you need to the Comment schema
export const CommentSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  body: z.string(),
  createdAt: z.date(),
  authorId: z.string(),
})
export type Comment = z.infer<typeof CommentSchema>

// ? These schemas are provided for you, but you may need to add more fields to them
export const CommentCreateSchema = CommentSchema.omit({ id: true, threadId: true, createdAt: true })
export type CommentCreate = z.infer<typeof CommentCreateSchema>

export const CommentUpdateSchema = CommentSchema.omit({ id: true, threadId: true, createdAt: true, createdBy: true })
export type CommentUpdate = z.infer<typeof CommentUpdateSchema>
