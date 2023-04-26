import { z } from 'zod'

// TODO: Add the fields you need to the Thread schema
export const threadSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty().min(5),
  description: z.string().min(1),
  username: z.string().min(3).nonempty(),
  createdAt: z.date(),
  changedAt: z.date(),

})

export type Thread = z.infer<typeof threadSchema>

// ? These schemas are provided for you, but you may need to add more fields to them
export const threadCreateSchema = threadSchema.omit({ id: true, createdAt: true ,changedAt:true })
export type ThreadCreate = z.infer<typeof threadCreateSchema>

export const threadUpdateSchema = threadSchema.omit({ id: true, createdAt: true, changedAt: true })
export type ThreadUpdate = z.infer<typeof threadUpdateSchema>
