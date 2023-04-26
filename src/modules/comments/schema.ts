import { z } from 'zod'

// TODO: Add the fields you need to the Comment schema
export const CommentSchema = z.object({
  id: z.string().nonempty(),
  threadId: z.string().nonempty(),
  username: z.string().min(3),
  message: z.string().min(1),
  createdAt: z.date(),
  changedAt: z.date(),
})
export type Comment = z.infer<typeof CommentSchema>

// ? These schemas are provided for you, but you may need to add more fields to them
export const CommentCreateSchema = CommentSchema.omit({ id: true, threadId: true, createdAt: true, changedAt: true })
export type CommentCreate = z.infer<typeof CommentCreateSchema>

export const CommentUpdateSchema = CommentSchema.omit({ id: true, threadId: true, createdAt: true, changedAt: true })
export type CommentUpdate = z.infer<typeof CommentUpdateSchema>
