import { app } from './app'

const PORT = (process.env.PORT ?? '8000') as string

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
